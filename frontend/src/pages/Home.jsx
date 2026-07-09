import Navbar from "../components/public/Navbar";
import ScrollProgress from "../components/public/ScrollProgress";
import Hero from "../components/public/Hero";
import StatsBar from "../components/public/StatsBar";
import Skills from "../components/public/Skills";
import Projects from "../components/public/Projects";
import Experience from "../components/public/Experience";
import Academics from "../components/public/Academics";
import Certifications from "../components/public/Certifications";
import Contact from "../components/public/Contact";

function Home() {
    return (
        <div className="bg-white text-black font-sans">
            <ScrollProgress />
            <Navbar />
            <Hero />
            <StatsBar />
            <Skills />
            <Academics />
            <Certifications />
            <Projects />
            <Experience />
            <Contact />
        </div>
    );
}

export default Home;