import Image from "next/image";
export default function Header() {
    return (
      <header className="absolute w-full dark:bg-cyan-400 h-10 bg-cyan-600 flex items-center justify-between">
        <h2 className="place-center m-2">Logotipo</h2>  
        <Image alt="Menu" src=""/>
      </header>
    );
  }
  