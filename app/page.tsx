import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc ,setDoc, doc, query, where} from 'firebase/firestore/lite';
import { Firestore, getCountFromServer } from 'firebase/firestore';
import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
//import { collection, query, where } from "firebase/firestore";
export default function Page() {

/*
var firebaseConfig = {
  apiKey: "AIzaSyDpLmM79mUqbMDBexFtOQOkSl0glxCW_ds",
  authDomain: "lfasdfkjkjlkjl.firebaseapp.com",
  databaseURL: "https://lfasdlkjkjlkjl.firebaseio.com",
  projectId: "lfasdlkjkjlkjl",
  storageBucket: "lfasdlkjkjlkjl.appspot.com",
  messagingSenderId: "616270824980",
  appId: "1:616270824990:web:40c8b177c6b9729cb5110f",
};
*/
const firebaseConfig = {
  apiKey: "AIzaSyCl4Epbggu5bQL5s9h0hricFSV86LjIppA",
  authDomain: "fsexample-16126.firebaseapp.com",
  projectId: "fsexample-16126",
  storageBucket: "fsexample-16126.appspot.com",
  messagingSenderId: "194808469868",
  appId: "1:194808469868:web:36f99de16428bde3013b49",
  measurementId: "G-YGRZ6D5L99"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);


const db:Firestore = getFirestore(app);

// Get a list of cities from your database
async function getCities(db:any) {
  const citiesCol = collection(db, 'cities');
  const citySnapshot = await getDocs(citiesCol);
  
  const cityList = citySnapshot.docs.map(doc => doc.data());
  console.log(cityList);
  return cityList;
}
//getCities(db);

async function test1(db:any) {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      first: "Ada",
      last: "Lovelace",
      born: 1815
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
async function test2(db:any){
  const citiesRef = collection(db, "cities");

await setDoc(doc(citiesRef, "SF"), {
    name: "San Francisco", state: "CA", country: "USA",
    capital: false, population: 860000,
    regions: ["west_coast", "norcal"] });
await setDoc(doc(citiesRef, "LA"), {
    name: "Los Angeles", state: "CA", country: "USA",
    capital: false, population: 3900000,
    regions: ["west_coast", "socal"] });
await setDoc(doc(citiesRef, "DC"), {
    name: "Washington, D.C.", state: null, country: "USA",
    capital: true, population: 680000,
    regions: ["east_coast"] });
await setDoc(doc(citiesRef, "TOK"), {
    name: "Tokyo", state: null, country: "Japan",
    capital: true, population: 9000000,
    regions: ["kanto", "honshu"] });
await setDoc(doc(citiesRef, "BJ"), {
    name: "Beijing", state: null, country: "China",
    capital: true, population: 21500000,
    regions: ["jingjinji", "hebei"] });
}
async function test3(db:any){
  const citiesRef = collection(db, "cities");

  const q = query(citiesRef, where("state", "==", "CA")); 
  //console.log(q);
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
  });

} 

async function test4(db:any){

  
  const collectionRef = db.collection('cities');
const snapshot = await collectionRef.count().get();
console.log(snapshot.data().count);
}
  //test4(db);


  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
      <AcmeLogo />
        {/* <AcmeLogo /> */}
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
        
        <div className="h-0 w-0 border-b-[30px] border-l-[20px] border-r-[20px] border-b-black border-l-transparent border-r-transparent"/>
          <p className={`${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}>
            <strong>Welcome to Acme.</strong> This is the example for the{' '}
            <a href="https://nextjs.org/learn/" className="text-blue-500">
              Next.js Learn Course
            </a>
            , brought to you by Vercel.
          </p>
          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          {/* Add Hero Images Here */}
          <Image
        src="/hero-desktop.png"
        width={1000}
        height={760}
        className="hidden md:block"
        alt="Screenshots of the dashboard project showing desktop version"
      />
      <Image
        src="/hero-mobile.png"
        width={560}
        height={620}
        className="block md:hidden"
        alt="Screenshot of the dashboard project showing mobile version"
      />
        </div>
      </div>
    </main>
  );
}
