import './AboutUsPage.css';
import { Fifth, First, Fourth, OurStories, Second, Seventh, Sixth, Third } from './AboutUsSections';
import Box from './Box';

export default function AboutUsPage() {
  return (
    <>
      <div className="inside-about-us__wrapper about-us__section">
        <Box content={<First />} />
        <Box content={<Second />} />
        <Box content={<Third />} />
        <Box content={<OurStories />} />
        <Box content={<Fourth />} />
        <Box content={<Fifth />} />
        <Box content={<Sixth />} />
        <Box content={<Seventh />} />
      </div>
    </>
  );
}
