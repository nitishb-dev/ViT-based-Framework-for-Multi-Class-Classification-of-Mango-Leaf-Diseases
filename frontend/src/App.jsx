import Navbar from "./components/Navbar";
import Introduction from "./components/Introduction";
import About from "./components/About";
import ProposedMethodology from "./components/ProposedMethodology";
import Results from "./components/Results";
import Predictor from "./components/Predictor";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 font-sans">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* About Section */}
        <section
          id="about"
          className="scroll-mt-24 min-h-screen flex items-center justify-center"
        >
          <About />
        </section>
        {/* Introduction Section */}
        <section
          id="introduction"
          className="scroll-mt-24 min-h-screen flex items-center justify-center"
        >
          <Introduction />
        </section>
        {/* Proposed Methodology Section */}
        <section
          id="methodology"
          className="scroll-mt-24 min-h-screen flex items-center justify-center"
        >
          <ProposedMethodology />
        </section>
        {/* Predictor/Main Results Section */}
        <section
          id="predict"
          className="scroll-mt-24 min-h-screen flex items-center justify-center"
        >
          <Predictor />
        </section>
        {/* Results Section */}
        <section
          id="results"
          className="scroll-mt-24 min-h-screen flex items-center justify-center"
        >
          <Results />
        </section>
      </main>

      <footer className="py-4 text-center text-gray-500 border-t bg-white">
        &copy; {new Date().getFullYear()} Mango Leaf Disease Classifier
      </footer>
    </div>
  );
}

export default App;
