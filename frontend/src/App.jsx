import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Methodology from "./components/ProposedMethodology";
import Predictor from "./components/Predictor";
import Results from "./components/Results";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <main>
        <section id="home">
          <Hero />
        </section>
        
        <section id="about" className="scroll-mt-20">
          <About />
        </section>
        
        <section id="methodology" className="scroll-mt-20">
          <Methodology />
        </section>
        
        <section id="predict" className="scroll-mt-20">
          <Predictor />
        </section>
        
        <section id="results" className="scroll-mt-20">
          <Results />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
