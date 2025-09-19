import React from 'react'

import HomeImage from '@/assets/home_img.png';
import TrackerIcon from '@/assets/tracker_icon.png'
import InsightsIcon from '@/assets/insights.png'
import Security from '@/assets/security.png'

import AddImg from '@/assets/add-img.jpg'
import TableImg from '@/assets/table.jpg'

import DonutImg from '@/assets/donut_chart.jpg'
import BarImg from '@/assets/bar.jpg'

import StarImg from '@/assets/star.png'

import { Button } from './components/ui/button';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='w-full bg-[whitesmoke] h-screen overflow-hidden overflow-y-scroll'>

        <div className='flex justify-evenly py-12 px-5 lg:px-20 '>

          <div className='text-left w-2/4 py-4'>
            <h1 className='text-slate-800 mb-4 md:mb-7 font-bold font-serif text-xl sm:text-2xl md:text-3xl nl:text-4xl lg:text-5xl'> Take Control of Your Finances Today </h1>
            <i className='text-md sm:text-lg md:text-xl lg:text-2xl'> Track your income and expenses effortlessly and achieve your financial goals. </i>
            <br></br>
            <Link to='/expense'>
              <Button className='bg-slate-700 mt-5 md:mt-10 w-40 sm:w-44 md:w-56 h-8 sm:h-12 md:h-14 text-sm sm:text-md md:text-lg hover:bg-slate-800 hover:transform hover:scale-105 hover:transition-all'> Get Started For Free  </Button>
            </Link> 
          </div>

          <img src={HomeImage} className='w-2/5 h-64 md:h-80 lg:h-96 mt-4 md:-mt-4' />

        </div>

        {/* ---------------------------------------------------------------------------------------------------------------- */}

        <div className='flex items-center justify-evenly flex-wrap'>
          
          <div className='w-[80%] sm:w-[40%] nl:w-[31%] lg:w-[27%] xl:w-1/4 sm:h-60 lg:h-64 xl:h-72 border-4 bg-blue-300 hover:border-blue-300 p-3 sm:p-2 xl:p-7 mb-6 flex flex-col items-center justify-evenly rounded-lg'>
            <img src={TrackerIcon} className='bg-white rounded-full p-1 sm:p-2 h-12 lg:h-16 xl:h-20'/>
            <h2 className='text-sm sm:text-md nl:text-lg lg:text-xl font-bold mt-2 sm:mt-4' > Easy Expense Tracking </h2>
            <i className='text-sm mt-3 font-semibold'> Log your expenses in real-time with our intuitive interface. Categorize your spending and always know where your money goes. </i>
          </div>

          <div className='w-[80%] sm:w-[40%] nl:w-[31%] lg:w-[27%] xl:w-1/4 sm:h-60 lg:h-64 xl:h-72 border-4 bg-green-300 hover:border-green-300 p-4 sm:p-2 xl:p-7 mb-6 flex flex-col items-center justify-evenly rounded-lg'>
            <img src={InsightsIcon} className='bg-white rounded-full p-1 sm:p-2 h-12 lg:h-16 xl:h-20'/>
            <h2 className='text-sm sm:text-md nl:text-lg lg:text-xl font-bold mt-2 sm:mt-4' > Visual Insights </h2>
            <i className='text-sm mt-3 font-semibold'> Understand your spending patterns with clear charts and graphs. See your financial health at a glance. </i>
          </div>

          <div className='w-[80%] sm:w-[40%] nl:w-[31%] lg:w-[27%] xl:w-1/4 sm:h-60 lg:h-64 xl:h-72 border-4 bg-yellow-300 hover:border-yellow-300 p-4 sm:p-2 xl:p-7 mb-6 flex flex-col items-center justify-evenly rounded-lg'>
            <img src={Security} className='bg-white rounded-full p-1 sm:p-2 h-12 lg:h-16 xl:h-20'/>
            <h2 className='text-sm sm:text-md nl:text-xl font-bold mt-2 sm:mt-4' > Secure and Private </h2>
            <i className='text-sm mt-3 font-semibold'> Your data is protected with top-notch security measures. Only you have access to your financial information. </i>
          </div>

        </div>

        {/* ---------------------------------------------------------------------------------------------------------------- */}

        <div className='flex flex-col nl:flex-row items-center justify-between xl:justify-evenly mt-10 nl:mt-20 px-8 xl:px-12'>

          <div className='hidden lg:block w-2/5 h-72'>
            <img src={AddImg} className='z-20 w-72 hover:border-4 hover:border-white'/>
            <img src={TableImg} className='z-10 w-80 -mt-56 h-44 ml-24 hover:border-4 hover:border-white hover:border-t-transparent hover:border-r-transparent'/>
          </div>

          <div className='w-full nl:w-2/4 lg:2/4 text-left'>
            <h1 className='text-2xl nl:text-3xl lg:text-4xl font-bold mb-2 text-blue-500'> Easy Expense Tracking </h1>
            {/* <i className='text-xl font-semibold text-green-900' > Use our powerful tools to visualize and understand your financial habits. </i> */}
            <br></br>
            <div className='px-6 py-4 bg-white rounded-3xl hover:drop-shadow-2xl '>
              <i className='sm:text-sm nl:text-base xl:text-lg font-semibold text-blue-950' > Logging your income and expenses with just a few clicks makes financial management straightforward and efficient. </i>
            </div>
            <br></br>
            <div className='px-6 py-4 bg-white rounded-3xl hover:drop-shadow-2xl'>
              <i className='sm:text-sm nl:text-base xl:text-lg font-semibold text-blue-950' > Compare your income and expenses for each month, helping you monitor your financial balance over time and identify trends. </i>
            </div>
          </div>

          <div className='lg:hidden mx-auto nl:w-2/5 h-72 mt-6'>
            <img src={AddImg} className='z-20 w-56 lg:w-72 hover:border-4 hover:border-white'/>
            <img src={TableImg} className='z-10 w-64 lg:w-80 -mt-56 h-40 lg:h-44 ml-24 hover:border-4 hover:border-white hover:border-t-transparent hover:border-r-transparent'/>
          </div>
    
        </div>

        <div className='flex flex-col nl:flex-row items-center justify-between lg:justify-evenly mt-12 nl:mt-24 px-8 xl:px-12'>

          <div className='w-full nl:w-2/4 text-left'>
            <h1 className='text-2xl nl:text-3xl lg:text-4xl font-bold mb-2 text-green-500'> Analyze Your Spending </h1>
            <br></br>
            <div className='px-6 py-4 bg-white rounded-3xl hover:drop-shadow-2xl '>
              <i className='text-base xl:text-lg font-semibold text-green-900' > See the distribution of your expenses across different categories, allowing you to quickly see where most of your money is going. </i>
            </div>
            <br></br>
            <div className='px-6 py-4 bg-white rounded-3xl hover:drop-shadow-2xl'>
              <i className='text-base xl:text-lg font-semibold text-green-900' > Compare your income and expenses for each month, helping you monitor your financial balance over time and identify trends. </i>
            </div>
          </div>

          <div className='w-2/4 lg:w-2/5 h-72 -ml-24 sm:ml-6 xl:ml-auto mt-6'>
            <img src={BarImg} className='z-10 w-96 sm:w-80 h-36 sm:h-52 hover:border-4 hover:border-white'/>
            <img src={DonutImg} className='z-20 w-44 sm:w-52 md:w-60 -mt-28 sm:-mt-40 ml-24 sm:ml-32 hover:border-4 hover:border-white'/>
          </div>

        </div>

        {/* ---------------------------------------------------------------------------------------------------------------- */}

        <div className='flex flex-col sm:flex-row items-center justify-evenly mt-2 sm:mt-12 md:mt-20 text-white'>
          
          <div id='grad' className='w-[80%] sm:w-[30%] xl:w-1/4 sm:h-44 xl:h-52 p-4 xl:p-7 mb-6 sm:mb-0 flex flex-col items-center justify-between rounded-lg'>
            <i className='mt-3 text-left sm:text-center font-semibold text-sm lg:text-[16.5px]'> " This app has completely changed how I manage my money. The insights are invaluable! " </i>
            <div className='w-full flex items-center justify-between pt-4 pb-2 sm:p-0'>
              <h1 className='text-sm md:text-base lg:text-lg font-semibold'> Yashwant Jaiswal </h1>
              <div className='flex items-center'>
                <img src={StarImg} className='w-4 md:w-5 lg:w-[25px]'/>
                <h1 className='text-sm md:text-base lg:text-xl font-semibold'> &nbsp;5.0 </h1>
              </div>
            </div>
          </div>

          <div id='grad' className='w-[80%] sm:w-[30%] xl:w-1/4 sm:h-44 xl:h-52 p-4 xl:p-7 mb-6 sm:mb-0 flex flex-col items-center justify-between rounded-lg'>
            <i className='mt-3 text-left sm:text-center font-semibold text-sm lg:text-[16.5px]'> "I love the budgeting features. They help me stay on track with my spending." </i>
            <div className='w-full flex items-center justify-between pt-4 pb-2 sm:p-0'>
              <h1 className='text-sm md:text-base lg:text-lg font-semibold'> Prabhmeet Singh </h1>
              <div className='flex items-center'>
                <img src={StarImg} className='w-4 md:w-5 lg:w-[25px]'/>
                <h1 className='text-sm md:text-base lg:text-xl font-semibold'> &nbsp;5.0 </h1>
              </div>
            </div>
          </div>

          <div id='grad' className='w-[80%] sm:w-[30%] xl:w-1/4 sm:h-44 xl:h-52 p-4 xl:p-7 mb-6 sm:mb-0 flex flex-col items-center justify-between rounded-lg'>
            <i className='mt-3 text-left sm:text-center font-semibold text-sm lg:text-[16.5px]'> "The best part is the security. I know my data is safe with this app." </i>
            <div className='w-full flex items-center justify-between pt-4 pb-2 sm:p-0'>
              <h1 className='text-sm md:text-base lg:text-lg font-semibold'> Pratham Bhatia </h1>
              <div className='flex items-center'>
                <img src={StarImg} className='w-4 md:w-5 lg:w-[25px]'/>
                <h1 className='text-sm md:text-base lg:text-xl font-semibold'> &nbsp;5.0 </h1>
              </div>
            </div>
          </div>

        </div>

        {/* ---------------------------------------------------------------------------------------------------------------- */}

        <div className='mt-6 sm:mt-12 md:mt-20 p-5 sm:p-7 md:p-10 sm:pt-7 text-sm sm:text-base nl:text-lg lg:text-xl xl:text-2xl bg-white'>
          <i> This tool is dedicated to help you manage your finances more effectively. It is not only powerful but also user-friendly and secure. With the right tools, everyone can achieve financial stability and freedom. </i>
        </div>

    </div>
  )
}

export default Home