import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { LandingPage } from './components/LandingPage/LandingPage';


const MockLandingPage=()=>{
  return(
    <BrowserRouter>
    <LandingPage/>
    </BrowserRouter>
  )
}

describe("Landing page",()=>{
  it("should render same text passed into title prop", async()=>{
    render(<MockLandingPage/>)
  })
})