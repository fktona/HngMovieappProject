import { useState, useEffect } from "react";
import "./App.css";
import RootLayout from "./RootLayout";

import { resources } from "./assets/resources";

export default function App() {
  console.log('true')
  return (
    <div className='mx-w-[1440px] relative mx-auto'>
      <RootLayout />
    </div>
  );
}
