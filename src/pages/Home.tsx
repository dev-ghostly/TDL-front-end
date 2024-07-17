import Navbar from "../components/Navbar";

export default function Home(){
    return <div>
        <Navbar/>
        <main className="flex max-w-6xl mx-auto font-website">
            <div className="w-1/2"></div>
            <div className="w-1/2 flex flex-col items-center">
                <h2 className=" text-4xl font-bold tracking-wide mt-60">stay organized,</h2>
                <h2 className=" text-4xl font-bold tracking-wide mt-3">stay relaxed</h2>
                <button className="mt-8 bg-three font-semibold uppercase px-8 py-2 rounded-full">Get started</button>
            </div>
        </main>
    </div>
}