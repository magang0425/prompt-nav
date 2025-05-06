import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import TeamsList from './components/TeamsList';
export function App() {
  return <div className="flex flex-col w-full min-h-screen bg-white">
      <Header />
      <main className="flex flex-col items-center px-4 md:px-8 lg:px-16 max-w-7xl mx-auto w-full">
        {/*<Hero />*/}
        <TeamsList />
      </main>
    </div>;
}