import { getUserAccounts } from '@/actions/dashboard'
import CreateDrawerAccount from '@/components/create-drawer-account'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Plus } from 'lucide-react'

import React from 'react'
import AccountCard from './_components/account-card'
import { BudgetProgress } from './_components/budget-progress'
import { getCurrentBudget } from '@/actions/budget'

const DashboardPage = async () => {
  const accounts = await getUserAccounts()

  const defaultAccount = accounts?.find((account) => account.isDefault);

  let budgetData = null;
  if (defaultAccount) {
    budgetData = await getCurrentBudget(defaultAccount.id);
  }

  return (
    <div className='px-5'>
      {/* budget progress bar */}
      <BudgetProgress
        initialBudget={budgetData?.budget}
        currentExpenses={budgetData?.currentExpenses || 0}
      />

      {/* create account section */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-8'>
        <CreateDrawerAccount>
          <Card className="hover:shadow-md cursor-pointer px-16 py-4 h-40 ">
            <CardContent className="flex flex-col justify-center items-center h-full pt-5 text-muted-foreground ">
              <Plus className="h-10 w-10 mb-2 text-gray-400" />
              <p className='text-sm text-gray-400 font- font-medium'>Add New Account</p>
            </CardContent>
          </Card>
        </CreateDrawerAccount>

        {accounts.length > 0 && accounts?.map((account) => {
          return <AccountCard key={account.id} account={account} />;
        })}
      </div>
    </div>
  )
}

export default DashboardPage
