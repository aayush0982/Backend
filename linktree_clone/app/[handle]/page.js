import { MongoClient } from "mongodb";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Page({ params }) {
  const handle = (await params).handle;

  if (!handle) {
    return notFound();
  }

  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  const db = client.db("linktree_clone");
  const collection = db.collection("links");

  const item = await collection.findOne({ handle });

  if (!item) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-[url('/assets/bg.png')] flex flex-col justify-center items-center gap-1">
      <img className="rounded-full h-[128px] w-[128px] object-cover mt-4" src={item.pic} alt="Profile" />
      <p className="font-bold">@{item.handle}</p>
      <p className="w-[20vw] text-center">{item.desc}</p>
      <div className="flex flex-col gap-4 mt-4 h-[60vh] overflow-y-auto p-3 ">
        {item.links.map((it, index) => (
          <Link key={index} href={it.linkurl} target="_blank">
            <div className="group relative w-[20vw] h-[48px] flex items-center justify-center 
                bg-white/20 backdrop-blur-lg shadow-lg 
                border border-white/30 rounded-lg 
                transition-transform duration-300 hover:animate-bounce-hover">
              {it.linktext}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
