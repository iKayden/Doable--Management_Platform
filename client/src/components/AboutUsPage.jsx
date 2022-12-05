import './AboutUsPage.css';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

const boxVariant = {
  visible: { opacity: 1, scale: 1, x: 0, transition: { duration: 0.5 } },
  hidden: { opacity: 0, scale: 0, x: 200 },
};

const Box = ({ content }) => {
  const control = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      control.start('visible');
    } else {
      control.start('hidden');
    }
  }, [control, inView]);

  return (
    <motion.div
      className="box"
      ref={ref}
      variants={boxVariant}
      initial="hidden"
      animate={control}
    >
      <div>{content} </div>
    </motion.div>
  );
};

function First() {
  return (
    <section className='about-us__section'>
      <h1>Hello everyone!</h1>
      <p>This was demonstration of our website</p>
      <p>We hope you enjoyed our project and presentation!</p>
    </section>
  );
}

function Second() {
  return (
    <section className="box about-us__section">
      <h2>This is the dev stack we've used to develop it</h2>
      <div className="section__images">
        <img
          src="https://ih1.redbubble.net/image.438908244.6144/st,small,507x507-pad,600x600,f8f8f8.u2.jpg"
          alt="express-logo"
        ></img>
        <img
          src="https://github.com/iKayden/doable/blob/kayden/about-ut-page/client/public/JavaScript-logo.png?raw=true"
          alt="js-logo"
        ></img>
        <img
          src="https://the-guild.dev/blog-assets/nodejs-esm/nodejs_logo.png"
          alt="nodejs-logo"
        ></img>
        <img
          src="https://ionicframework.com/docs/icons/logo-react-icon.png"
          alt="react-logo"
        ></img>
        <img
          src="https://www.influxdata.com/wp-content/uploads/PostgreSQL-logo.jpg"
          alt="postgresql-logo"
        ></img>
      </div>
    </section>
  );
}

function Third() {
  return (
    <section className='about-us__section'>
      <h2>This is our amazing team</h2>
      <img
        className="about-us_group-photo"
        src="https://res.cloudinary.com/kaydenukr/image/upload/c_scale,h_1800,w_2400/v1670265748/pictures/bestteam_atlwus.jpg"
        alt="our-team"
      ></img>
    </section>
  );
}

function Fourth() {
  return (
    <section className="about-us__our-stories about-us__section">
      <h2>Eileen</h2>
      <div className="flex-wrapper__our-stories">
        <img
          className="about-us__first-picture"
          src="https://res.cloudinary.com/kaydenukr/image/upload/c_scale,h_880,w_500/v1670266958/pictures/eileen_vuscdv_ba2245.jpg"
          alt="eileen"
        ></img>
        <p className='about-us__text'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla est
          officia, expedita vitae illum eum laboriosam! Ut obcaecati pariatur
          laborum eius natus quos, tempora nam corrupti inventore libero
          distinctio fugiat.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla est
          officia, expedita vitae illum eum laboriosam! Ut obcaecati pariatur
          laborum eius natus quos, tempora nam corrupti inventore libero
          distinctio fugiat.
        </p>
      </div>
    </section>
  );
}

function Fifth() {
  return (
    <section className="about-us__our-stories about-us__section">
      <h2>Rosanna</h2>
      <div className="flex-wrapper__our-stories">
        <img
          className="about-us__second-picture"
          src="https://res.cloudinary.com/kaydenukr/image/upload/c_scale,w_500/v1670267447/pictures/rosanna_fiuioq_e42cc3.jpg"
          alt="rosanna"
        ></img>
        <p className='about-us__text'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla est
          officia, expedita vitae illum eum laboriosam! Ut obcaecati pariatur
          laborum eius natus quos, tempora nam corrupti inventore libero
          distinctio fugiat.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla est
          officia, expedita vitae illum eum laboriosam! Ut obcaecati pariatur
          laborum eius natus quos, tempora nam corrupti inventore libero
          distinctio fugiat.
        </p>
      </div>
    </section >
  );
}
function Sixth() {
  return (
    <section className="about-us__our-stories about-us__section">
      <h2>Kayden</h2>
      <div className="flex-wrapper__our-stories">
        <img
          className="about-us__third-picture"
          src="https://res.cloudinary.com/kaydenukr/image/upload/c_scale,w_500/v1670267315/pictures/kayden_jhr6uk_4f4282.jpg"
          alt="kayden"
        ></img>
        <p className='about-us__text'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla est
          officia, expedita vitae illum eum laboriosam! Ut obcaecati pariatur
          laborum eius natus quos, tempora nam corrupti inventore libero
          distinctio fugiat.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla est
          officia, expedita vitae illum eum laboriosam! Ut obcaecati pariatur
          laborum eius natus quos, tempora nam corrupti inventore libero
          distinctio fugiat.
        </p>
      </div>
    </section>
  );
}
function Seventh() {
  return (
    <section className="about-us__section">
      <h1>Thank you for your time and attention</h1>
      <img
        className="about-us__closeup-picture"
        src="https://images.hindustantimes.com/img/2021/11/21/1600x900/Cats_if_i_fits_i_sits_video_Instagram_1637494724139_1637494737839.PNG"
        alt="team"
      ></img>
    </section>
  );
}

export default function AboutUsPage() {
  return (
    <>
      <div className="inside-about-us__wrapper about-us__section">
        <Box content={<First />} />
        <Box content={<Second />} />
        <Box content={<Third />} />
        <Box content={<h3
          className='about-us__our-stories about-us__section'
        >Our stories</h3>} />
        <Box content={<Fourth />} />
        <Box content={<Fifth />} />
        <Box content={<Sixth />} />
        <Box content={<Seventh />} />
      </div>
    </>
  );
}
