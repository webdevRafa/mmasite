import { UpcomingEvent } from "../components/UpcomingEvent"




export const Home: React.FC = () => {

    return <>
    <div className="w-full mx-auto max-w-[1400px] mt-20 ">
     <div className="py-20 text-center">
           <h1 className="offwhite text-3xl">WELCOME TO MMA CHATSHIT</h1>
        <p className="offwhite-darker">chat shit and have a good time</p>
        
     </div>
      <UpcomingEvent />

    
    </div>
    </>
}