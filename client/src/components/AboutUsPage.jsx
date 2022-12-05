import './AboutUsPage.css';
import { Rosanna, Intro, Eileen, OurStories, TechStack, OurTeam, Kayden, TheEnd } from './AboutUsSections';
import Box from './Box';

export default function AboutUsPage() {
  return (
    <>
      <div className="inside-about-us__wrapper about-us__section">
        <Box content={<Intro />} />
        <Box content={<TechStack />} />
        <Box content={<OurTeam />} />
        <Box content={<OurStories />} />
        <Box content={<Eileen />} />
        <Box content={<Rosanna />} />
        <Box content={<Kayden />} />
        <Box content={<TheEnd />} />
      </div>
    </>
  );
}
