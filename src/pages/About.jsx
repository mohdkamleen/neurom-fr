import React from 'react';

const About = () => {
  return (
    <div className="max-w-4xl px-4 py-10 text-gray-800" style={{margin:"30px 5%"}}>
      <h1 className="text-4xl font-bold mb-8 text-center">
        🏏 About TBCL – Tennis Ball Cricket Championship League
      </h1>

      <section className="mb-8">
        <p className="text-lg leading-relaxed">
          The <strong>Tennis Ball Cricket Championship League (TBCL)</strong> is a professionally organized league designed
          to promote talented players in the tennis ball cricket format. It aims to provide opportunities to emerging cricketers
          from across <strong>Ambedkarnagar</strong> by giving them a recognized platform to showcase their skills.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">🌟 Who Can Join?</h2>
        <p className="text-lg leading-relaxed">
          Anyone with talent and passion for tennis ball cricket can join TBCL — especially <strong>young, grassroots-level
          cricketers</strong> from small towns and cities. There are no strict age limits, but players must provide
          <strong> valid government-issued ID proof</strong> and meet basic <strong>physical and sports criteria</strong> set by the league.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">📝 Registration Process</h2>
        <p className="text-lg leading-relaxed">
          To join TBCL, players must <strong>register online</strong> through the official website. During registration, you’ll be asked to:
        </p>
        <ul className="list-disc ml-6 mt-3 text-lg">
          <li>Fill out your personal details (name, age, address, role in the team)</li>
          <li>Upload a valid photo ID proof</li>
          <li>Possibly pay a small registration fee</li>
        </ul>
        <p className="text-lg mt-3">
          Once registered, players will receive updates about <strong>trial dates and venues</strong>.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">🏏 Selection Trials</h2>
        <p className="text-lg leading-relaxed">
          After registration, selected players are invited to attend <strong>selection trials</strong> held in different cities.
          During the trials, your <strong>batting, bowling, fielding, and fitness</strong> will be assessed by qualified selectors.
          Selections are based purely on <strong>merit and performance</strong>. If you impress, you could be chosen to
          represent a team in TBCL.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">📜 League Rules & Conduct</h2>
        <p className="text-lg leading-relaxed">
          Once selected, players must follow the <strong>official TBCL rules</strong>, including:
        </p>
        <ul className="list-disc ml-6 mt-3 text-lg">
          <li>Wearing proper cricket gear (jersey, pads, gloves, shoes, etc.)</li>
          <li>Respectful behavior on and off the field</li>
          <li>Following TBCL’s game formats and match regulations</li>
        </ul>
        <p className="text-lg mt-3">
          Violating the code of conduct can lead to <strong>disqualification</strong> from the league.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">🚀 Career Opportunities</h2>
        <p className="text-lg leading-relaxed">
          One of the biggest advantages of joining TBCL is the <strong>career path it opens up</strong>. Exceptional performers may
          get noticed by clubs, scouts, and sponsors — providing a gateway to higher-level cricket opportunities.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">📞 Contact Us</h2>
        <p className="text-lg leading-relaxed">
          For more details, you can reach out to the TBCL team:
        </p>
        <p className="text-lg mt-2">
          <strong>📞 Phone:</strong> +91 95806 50975 <br />
          <strong>📧 Email:</strong> tbclaleague@gmail.com
        </p>
      </section>
    </div>
  );
};

export default About;
