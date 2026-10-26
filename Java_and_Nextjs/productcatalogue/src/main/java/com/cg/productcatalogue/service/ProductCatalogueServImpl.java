package com.cg.productcatalogue.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.cg.productcatalogue.entity.ProductCatalogue;
import com.cg.productcatalogue.modal.Category;
import com.cg.productcatalogue.modal.Product;
import com.cg.productcatalogue.modal.ProductInventory;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class ProductCatalogueServImpl implements ProductCatalogueService {

        private final RestTemplate restTemplate;
        private static final Logger logger = LoggerFactory.getLogger(ProductCatalogueServImpl.class);

        public ProductCatalogueServImpl(RestTemplate restTemplate) {
                this.restTemplate = restTemplate;
        }

        @Override
        public String addProduct(ProductCatalogue productCatalogue) {
                logger.info("Adding product to catalogue. productId={}", productCatalogue.getProductId());
                Product Product = new Product();
                Product.setProductId(productCatalogue.getProductId());
                Product.setProductName(productCatalogue.getProductName());
                Product.setProductPrice(productCatalogue.getProductPrice());

                ProductInventory productInventory = new ProductInventory();
                productInventory.setProductId(productCatalogue.getProductId());
                productInventory.setProductQuantity(productCatalogue.getProductQuantity());

                // Call the Product Service to add the product
                String productServiceUrl = "http://localhost:8085/products/save";
                restTemplate.postForObject(productServiceUrl, Product, String.class);

                // Check whether category already exists
                String checkCategoryUrl = "http://localhost:8086/category/checkCategoryExists?categoryName="
                                + productCatalogue.getProductCategory();

                Boolean categoryExists = restTemplate.getForObject(
                                checkCategoryUrl,
                                Boolean.class);

                // If category doesn't exist, create it
                if (Boolean.FALSE.equals(categoryExists)) {

                        Category category1 = new Category();
                        category1.setCategoryName(productCatalogue.getProductCategory());
                        category1.setProductId(new ArrayList<>());

                        String categoryServiceUrl = "http://localhost:8086/category/add";

                        restTemplate.postForObject(
                                        categoryServiceUrl,
                                        category1,
                                        String.class);
                }

                // Add product to category
                String addProductToCategoryUrl = "http://localhost:8086/category/addProductToCategory"
                                + "?categoryName=" + productCatalogue.getProductCategory()
                                + "&productId=" + productCatalogue.getProductId();

                restTemplate.postForObject(
                                addProductToCategoryUrl,
                                null,
                                String.class);
                // Call the Product Inventory Service to add the product inventory
                String productInventoryServiceUrl = "http://localhost:8089/productinventory/add"
                                + "?productId=" + productInventory.getProductId()
                                + "&productQuantity=" + productInventory.getProductQuantity();

                restTemplate.postForObject(
                                productInventoryServiceUrl,
                                null,
                                String.class);

                logger.info("Product added successfully. productId={}", productCatalogue.getProductId());
                return "Product added successfully";

        }

        @Override
        public List<ProductCatalogue> getAllProducts() {
                logger.info("Fetching all products for catalogue");

                String productUrl = "http://localhost:8085/products/getAll";

                Product[] products = restTemplate.getForObject(productUrl, Product[].class);

                List<ProductCatalogue> result = new ArrayList<>();

                if (products != null) {

                        for (Product product : products) {

                                ProductCatalogue catalogue = new ProductCatalogue();

                                catalogue.setProductId(product.getProductId());
                                catalogue.setProductName(product.getProductName());
                                catalogue.setProductPrice(product.getProductPrice());

                                // Get category
                                String categoryUrl = "http://localhost:8086/category/getCategoryByProductId"
                                                + "?productId=" + product.getProductId();

                                String category = restTemplate.getForObject(
                                                categoryUrl,
                                                String.class);

                                catalogue.setProductCategory(category);

                                // Get inventory
                                String inventoryUrl = "http://localhost:8089/productinventory/getByProductId"
                                                + "?productId=" + product.getProductId();

                                Integer quantity = restTemplate.getForObject(
                                                inventoryUrl,
                                                Integer.class);

                                catalogue.setProductQuantity(quantity);

                                result.add(catalogue);
                        }
                }

                logger.info("Finished fetching catalogue products. count={}", result.size());
                return result;
        }

        @Override
        public List<ProductCatalogue> getProductByCategory(String categoryName) {
                logger.info("Fetching products by category. categoryName={}", categoryName);

                String categoryUrl = "http://localhost:8086/category/productsCategoryWise"
                                + "?categoryName=" + categoryName;

                Product[] products = restTemplate.getForObject(
                                categoryUrl,
                                Product[].class);

                List<ProductCatalogue> result = new ArrayList<>();

                if (products != null) {

                        for (Product p : products) {

                                ProductCatalogue catalogue = new ProductCatalogue();

                                catalogue.setProductId(p.getProductId());
                                catalogue.setProductName(p.getProductName());
                                catalogue.setProductCategory(categoryName);
                                catalogue.setProductPrice(p.getProductPrice());

                                // Get inventory
                                String inventoryUrl = "http://localhost:8089/productinventory/getByProductId"
                                                + "?productId=" + p.getProductId();

                                Integer quantity = restTemplate.getForObject(
                                                inventoryUrl,
                                                Integer.class);

                                catalogue.setProductQuantity(quantity);

                                result.add(catalogue);
                        }
                }

                logger.info("Finished fetching products by category. categoryName={}, count={}", categoryName,
                                result.size());
                return result;
        }

        @Override
        public List<ProductCatalogue> getProductByRange(
                        double minPrice,
                        double maxPrice) {
                logger.info("Fetching products by price range. minPrice={}, maxPrice={}", minPrice, maxPrice);

                String productUrl = "http://localhost:8085/products/getByPriceBetween"
                                + "?minPrice=" + minPrice
                                + "&maxPrice=" + maxPrice;

                Product[] products = restTemplate.getForObject(
                                productUrl,
                                Product[].class);

                List<ProductCatalogue> result = new ArrayList<>();

                if (products != null) {

                        for (Product product : products) {

                                ProductCatalogue catalogue = new ProductCatalogue();

                                catalogue.setProductId(product.getProductId());
                                catalogue.setProductName(product.getProductName());
                                catalogue.setProductPrice(product.getProductPrice());

                                // Get category
                                String categoryUrl = "http://localhost:8086/category/getCategoryByProductId"
                                                + "?productId=" + product.getProductId();

                                String category = restTemplate.getForObject(
                                                categoryUrl,
                                                String.class);

                                catalogue.setProductCategory(category);

                                // Get inventory
                                String inventoryUrl = "http://localhost:8089/productinventory/getByProductId"
                                                + "?productId=" + product.getProductId();

                                Integer quantity = restTemplate.getForObject(
                                                inventoryUrl,
                                                Integer.class);

                                catalogue.setProductQuantity(quantity);

                                result.add(catalogue);
                        }
                }

                logger.info("Finished fetching products by price range. count={}", result.size());
                return result;
        }

        @Override
        public ProductCatalogue getProductByName(String productName) {
                logger.info("Fetching product by name. productName={}", productName);

                String productUrl = "http://localhost:8085/products/getAll";

                Product[] products = restTemplate.getForObject(
                                productUrl,
                                Product[].class);

                if (products != null) {

                        for (Product product : products) {

                                if (product.getProductName()
                                                .equalsIgnoreCase(productName)) {

                                        ProductCatalogue catalogue = new ProductCatalogue();

                                        catalogue.setProductId(
                                                        product.getProductId());

                                        catalogue.setProductName(
                                                        product.getProductName());

                                        catalogue.setProductPrice(
                                                        product.getProductPrice());

                                        // Get category
                                        String categoryUrl = "http://localhost:8086/category/getCategoryByProductId"
                                                        + "?productId=" + product.getProductId();

                                        String category = restTemplate.getForObject(
                                                        categoryUrl,
                                                        String.class);

                                        catalogue.setProductCategory(category);

                                        // Get inventory
                                        String inventoryUrl = "http://localhost:8089/productinventory/getByProductId"
                                                        + "?productId=" + product.getProductId();

                                        Integer quantity = restTemplate.getForObject(
                                                        inventoryUrl,
                                                        Integer.class);

                                        catalogue.setProductQuantity(quantity);

                                        logger.info("Product found by name. productName={}, productId={}",
                                                        productName, product.getProductId());
                                        return catalogue;
                                }
                        }
                }

                logger.warn("Product not found by name. productName={}", productName);
                return null;
        }

        @Override
        public ProductCatalogue getProductById(int productId) {
                logger.info("Fetching product by ID. productId={}", productId);

                String productUrl = "http://localhost:8085/products/getById"
                                + "?productId=" + productId;

                Product product = restTemplate.getForObject(
                                productUrl,
                                Product.class);

                if (product == null) {
                        logger.warn("Product not found by ID. productId={}", productId);
                        return null;
                }

                ProductCatalogue catalogue = new ProductCatalogue();

                catalogue.setProductId(
                                product.getProductId());

                catalogue.setProductName(
                                product.getProductName());

                catalogue.setProductPrice(
                                product.getProductPrice());

                // Get category
                String categoryUrl = "http://localhost:8086/category/getCategoryByProductId"
                                + "?productId=" + productId;

                String category = restTemplate.getForObject(
                                categoryUrl,
                                String.class);

                catalogue.setProductCategory(category);

                // Get inventory
                String inventoryUrl = "http://localhost:8089/productinventory/getByProductId"
                                + "?productId=" + productId;

                Integer quantity = restTemplate.getForObject(
                                inventoryUrl,
                                Integer.class);

                catalogue.setProductQuantity(quantity);

                logger.info("Product fetched successfully. productId={}", productId);
                return catalogue;
        }

        public String deleteProduct(Integer productId) {
                logger.info("Deleting product from catalogue. productId={}", productId);

                // 1. Get category of product
                String categoryUrl = "http://localhost:8086/category/getCategoryByProductId"
                                + "?productId=" + productId;

                String categoryName = restTemplate.getForObject(
                                categoryUrl,
                                String.class);

                // 2. Remove product from category
                String removeCategoryUrl = "http://localhost:8086/category/removeProductFromCategory"
                                + "?categoryName=" + categoryName
                                + "&productId=" + productId;

                restTemplate.postForObject(
                                removeCategoryUrl,
                                null,
                                String.class);

                // 3. Remove product from inventory
                String inventoryUrl = "http://localhost:8089/productinventory/delete"
                                + "?productId=" + productId;

                restTemplate.postForObject(
                                inventoryUrl,
                                null,
                                String.class);

                // 4. Delete product from Product Service
                String productUrl = "http://localhost:8085/products/delete/"
                                + productId;

                restTemplate.delete(productUrl);

                logger.info("Product deleted successfully. productId={}", productId);
                return "Product deleted successfully";
        }

}
