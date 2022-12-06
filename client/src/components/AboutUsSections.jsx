export function Intro() {
  return (
    <section className="about-us__section">
      <h1>Hello everyone!</h1>
      <p>This was a demonstration of our website application</p>
      <p>We hope you enjoyed our project and presentation!</p>
    </section>
  );
}

export function TechStack() {
  return (
    <section className="box about-us__section">
      <h2>This is the tech stack we used to develop it</h2>
      <div className="section__images">
        <img
          src="https://ih1.redbubble.net/image.438908244.6144/st,small,507x507-pad,600x600,f8f8f8.u2.jpg"
          alt="express-logo"
        ></img>
        <img
          src="https://cdn-icons-png.flaticon.com/512/5968/5968292.png"
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

export function OurTeam() {
  return (
    <section className="about-us__section">
      <h2>This is the amazing team</h2>
      <img
        className="about-us_group-photo"
        src="https://res.cloudinary.com/kaydenukr/image/upload/c_scale,h_1800,w_2400/v1670265748/pictures/bestteam_atlwus.jpg"
        alt="our-team"
      ></img>
    </section>
  );
}

export function Eileen() {
  return (
    <section className="about-us__our-stories about-us__section">
      <h2>Eileen</h2>
      <div className="flex-wrapper__our-stories">
        <img
          className="about-us__personal-picture"
          src="https://res.cloudinary.com/kaydenukr/image/upload/c_scale,h_880,w_500/v1670266958/pictures/eileen_vuscdv_ba2245.jpg"
          alt="eileen"
        ></img>
        <p className="about-us__text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla est
          officia, expedita vitae illum eum laboriosam! Ut obcaecati pariatur
          laborum eius natus quos, tempora nam corrupti inventore libero
          distinctio fugiat. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Nulla est officia, expedita vitae illum eum laboriosam! Ut
          obcaecati pariatur laborum eius natus quos, tempora nam corrupti
          inventore libero distinctio fugiat.
        </p>
      </div>
    </section>
  );
}

export function Rosanna() {
  return (
    <section className="about-us__our-stories about-us__section">
      <h2>Rosanna</h2>
      <div className="flex-wrapper__our-stories">
        <img
          className="about-us__personal-picture"
          src="https://res.cloudinary.com/kaydenukr/image/upload/c_scale,w_500/v1670268183/pictures/rosanna_f.jpg"
          alt="rosanna"
        ></img>
        <p className="about-us__text">
          Accomplishments
          <ul>
            <li>Pair Programming:</li>
            <ul>
              <li>Structure and Routing of the project</li>
              <li>Initial seeds/database tables and relationships</li>
              <li>React Drag and Drop (DnD) & Websockets: Chat Feature</li>
              <li>Implemented useReducer and useContext hooks and behavior</li>
            </ul>
            <li>Personal:</li>
            <ul>
              <li>Page/Footer/Delete Confirmation Modal</li>
            </ul>
          </ul>
          Roadblocks
          <ul>
            <li> Learning React Reducer/useContext and React DnD</li>
          </ul>
        </p>
      </div>
    </section>
  );
}
export function Kayden() {
  return (
    <section className="about-us__our-stories about-us__section">
      <h2>Kayden</h2>
      <div className="flex-wrapper__our-stories">
        <img
          className="about-us__personal-picture-kayden"
          src="https://res.cloudinary.com/kaydenukr/image/upload/c_scale,w_500/v1670268258/pictures/kayden_f.jpg"
          alt="kayden"
        ></img>
        <p className='about-us__text'>
          <strong>Accomplishments:</strong> <br />
          <ul>
            <li>Pair Programming:</li>
            <ul>
              <li>Structure and Routing of the project</li>
              <li>Seeds And Database Tables</li>
              <li>React Drag and Drop</li>
              <li>Websockets: Chat Feature</li>
              <li>Implemented useReducer and useContext hooks and behavior</li>
            </ul>
            <li>Personal:</li>
            <ul>
              <li>Add avatars to the users (task list, chat, navbar)</li>
              <li>Designed Name, Icon, Color Pallet</li>
              <li>Seeds And Database Tables</li>
              <li>Initial SQL queries to achieve all basic operations</li>
            </ul>
          </ul>
          <strong>Road Blocks:</strong> <br />
          <ul>
            <li>Specifics of React States and Hooks</li>
            <li>Fetching and Inserting correct Data into the Database</li>
            <li>Team Management</li>
          </ul>
          <span>
            <strong>Things I would do differently?</strong><br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, eaque quae animi consequatur ab minus unde, velit sunt ad mollitia porro voluptates nihil molestiae fuga? Laborum eum enim sunt vero!
          </span>
        </p>
      </div>
    </section>
  );
}
export function TheEnd() {
  return (
    <section className="about-us__section">
      <h1>Thank you for your time and attention</h1>
      <h2>We will be happy to answer any of your questions!</h2>
      <img
        className="about-us_group-photo"
        src="https://res.cloudinary.com/kaydenukr/image/upload/c_scale,w_982/v1670286756/pictures/team2_jkenp3.jpg"
        alt="team"
      ></img>
    </section>
  );
}
export function OurStories() {
  return (
    <h3 className="about-us__our-stories about-us__section">Our stories</h3>
  );
}
