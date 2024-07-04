'use client'
import React, { useState, useEffect, useRef } from 'react';
import ReactSpeedometer from 'react-d3-speedometer';
import Image from 'next/image';
import Circle_G from '#/Circle-G.svg';
import Circle_R from '#/Circle-R.svg';


function getActualTime(specific = -1){
  const mexicoTime = new Date().toLocaleString("en-US", { timeZone: "America/Mexico_City" });
  const currentDate = new Date(mexicoTime);
  let SpecificDateNumber;

  
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();


  if (specific >= 0)
      return `${day}-${month}-${year}`;
  
  return `${hours}:${minutes}:${seconds}`;
}

interface SpeedometerText {
  text: string;
  position: 'INSIDE';
  color: string;
  fontSize?: string;
}

const speedometerText: SpeedometerText[] = [
  { text: 'Muy Acido', position: 'OUTSIDE', color: '#FAFAFA' },
  { text: 'Acido', position: 'INSIDE', color: '#555' },
  { text: 'Potable', position: 'INSIDE', color: '#555', fontSize: '15px' },
  { text: 'Alcalino', position: 'INSIDE', color: '#555' },
  { text: 'Muy Alcalino', position: 'OUTSIDE', color: '#FAFAFA' },
];

const LiquidText: SpeedometerText[] = [
  { text: '20%', position:"OUTSIDE", color: '#fafafa' },
  { text: '40%', position: 'OUTSIDE', color: '#FAFAFA' },
  { text: '60%', position: 'OUTSIDE', color: '#FAFAFA', fontSize: '15px' },
  { text: '80%', position: 'OUTSIDE', color: '#FAFAFA' },
  { text: '100%', position: 'OUTSIDE', color: '#FAFAFA' },
];

const WeatherText: SpeedometerText[] = [
  { text: '-20', position:"OUTSIDE", color: '#fafafa' },
  { text: '', position: 'OUTSIDE', color: '#FAFAFA' },
  { text: '', position: 'OUTSIDE', color: '#FAFAFA' },
  { text: '', position: 'OUTSIDE', color: '#FAFAFA' },
  { text: '100', position: 'OUTSIDE', color: '#FAFAFA', fontSize: '15px' },
];

const segmentStops=[0, 2, 6.5,8.5,12,14 ]
const MAX_VALUE = 14;
const speedometerColors = ['tomato', 'gold', 'limegreen', 'gold', 'tomato'];
const weatherColors = ['white', 'cyan', 'cyan', 'tomato', 'tomato'];

export default function Home() {
  const divRef = useRef<HTMLDivElement>(null);
  const [divWidth, setDivWidth] = useState<number>(0);
  const [speedo, setSpeedo] = useState<JSX.Element | null>(null);
  const [value, setValue] = useState<number[]>([7.5837,20]);
  const [hora, setHora] = useState<string[]>(getActualTime(-1));

  useEffect(() => {
    const handleResize = () => {
      if (divRef.current) {
        const width = divRef.current.offsetWidth;
        setDivWidth(width);
      }
    };
    
    // Initial measurement
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  
  useEffect(() => {
    const interval = setInterval(() => {
      const randomChange = (Math.random() - 0.5) * 0.3;
      
      setValue((prevValue) => {
        let newValue = [prevValue[0] + randomChange,prevValue[1] + randomChange];
        return newValue;
      });
    }, 7500);

    return () => {
      clearInterval(interval); // Clean up the interval on component unmount
    };
  }, []);

  useEffect(() => {
    const intervalo = setInterval(() => {
       let string: string[];
       string = [getActualTime(-1),getActualTime(1)];
      setHora(string);
      }
    , 1000)
    return () => {
      clearInterval(intervalo); // Clean up the interval on component unmount
    };
  }, []);


  return (
    <main className="text-white bg-cyan-900 md:max-h-screen min-h-screen md:p-24 pt-24 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 justify-items-center items-center gap-4 bg-gradient-to-r from-blue-800 via-blue-950 to-blue-800 md:overflow-hidden">
      <div className="relative flex items-center justify-center text-center align-middle text-4xl p-4 h-full w-full bg-sky-500/50">
        <Image className="object-fill -z-0 lg:p-20" fill={true} alt="active" src={Circle_G} />
      </div>
     
      <div ref={divRef} className="relative text-center align-middle text-4xl p-4 w-full h-full bg-sky-500/30 row-span-2">
        <Image className="absolute h-8 md:h-auto" alt="active" src={Circle_G} />
        <div className="h-full w-full grid grid-rows-2 justify-center">
          <div className="w-full mt-10 md:m-10">
          {
            divWidth > 0?
            <ReactSpeedometer
            width={divWidth-50}
            needleHeightRatio={0.7}
            value={value}
            maxValue={14}
            currentValueText=" "
            segmentColors={speedometerColors}
            customSegmentLabels={speedometerText}
            customSegmentStops={segmentStops}
            ringWidth={47}
            needleTransitionDuration={3333}
            needleTransition="easeElastic"
            needleColor={'#90f2ff'}
            textColor={'#d8dee9'}
        />
        :
        <>
        </>
          }
          
          </div>
          <div className='flex flex-col md:m-20  gb'>
            <div className='border-2 border-black bg-emerald-300/50'>
              <h3> PH </h3>            
            </div>
            <div className='text-5xl h-2/3 flex items-center justify-center border-black border-2 w-full bg-emerald-500/50'>
            
              <h5>{value[0].toFixed(4)}</h5>
                
            </div>               
            
          </div>
          
        </div>
        
      </div>
      <div className="text-center align-middle text-4xl p-4  w-full h-full bg-sky-500/30">
            <div className='bg-cyan-500'>
              <h4>{hora[1]}</h4>
            </div>
            <div className='flex h-3/4 text-center items-center justify-center'>
              <h1 className='text-5xl lg:text-8xl'>{hora[0]}</h1>
            </div>
            </div>
            <div className="text-center align-middle text-4xl p-4  w-full h-full bg-sky-500/30"><Image
            className="h-8 md:h-auto  "
            alt="active"
            src={Circle_R} />
            { 
            divWidth > 0 ?
            <ReactSpeedometer
              width={divWidth-50}
              startColor='#FAFAFA'
              endColor='#4A4AFA'
              textColor='#FAFAFA'
              customSegmentLabels={
                LiquidText
              }
              currentValueText='Capacidad'
              maxValue={100}
              value={value[1]}
            />: 
            <></>}
            
            </div>
            <div className="text-center align-middle text-4xl p-4  w-full h-full bg-sky-500/30">
            <Image
            className="h-8 md:h-auto"
            alt="active"
            
            src={Circle_R} />
            { 
            divWidth > 0 ?
            <ReactSpeedometer
              width={divWidth-50}
              startColor='#FAFAFA'
              endColor='#FA4A4A'
              textColor='#FAFAFA'
              segmentColors={weatherColors}
              customSegmentLabels={
                WeatherText
              }
              currentValueText='Temperatura'
              maxValue={100}
              value={value[1]}
            />: 
            <></>}
            
            </div>

    </main>
  );
}
