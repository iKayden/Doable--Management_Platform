import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

const boxVariant = {
  visible: { opacity: 1, scale: 1, x: 0, transition: { duration: 1 } },
  hidden: { opacity: 0, scale: 0, x: -200 },
};
const Box = ({ content }) => {
  const control = useAnimation();
  const [ref, inView] = useInView();
  const isInView = useInView(ref, { once: true });

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


export default Box;
