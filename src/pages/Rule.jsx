import React from 'react';

const Rules = () => {
  return (
    <div className="max-w-4xl px-4 py-10 text-gray-800"  style={{margin:"30px 5%"}}>
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
        🏏 Rules of TBCL – Full Boundary Format
      </h1>

      <div className="space-y-6 text-lg leading-relaxed">
        <div>
          <h2 className="text-xl font-semibold">1. Match Ground & Boundary</h2>
          <p>
            Matches will be played on a <strong>full-size cricket ground</strong> with standard boundaries (approx. 60–75 meters depending on ground availability). <br />
            Boundary ropes will be clearly marked as per professional cricket standards.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">2. Players</h2>
          <p>
            Each team will consist of <strong>11 players</strong>, including batsmen, bowlers, wicketkeeper, and all-rounders. <br />
            Substitutes are allowed as per standard cricket rules (<strong>fielding only</strong>, no batting/bowling unless injury replacement is approved).
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">3. Scoring & Dismissals</h2>
          <ul className="list-disc ml-6">
            <li>Six (6) runs for shots hit directly outside the boundary without touching the ground.</li>
            <li>Four (4) runs for shots crossing the boundary after touching the ground.</li>
            <li>Standard methods of dismissal apply: Bowled, Caught, Run Out, Stumped, Hit Wicket, etc.</li>
            <li>No batsman will be declared out for hitting the ball directly out of the playing field.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold">4. Overs & Format</h2>
          <p>
            Match format can vary: <strong>10, 12, or 15 overs</strong> per side depending on the time and schedule.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">5. No Ball & Free Hit</h2>
          <ul className="list-disc ml-6">
            <li>Any front-foot no ball will result in a <strong>Free Hit</strong>.</li>
            <li>Bouncers above shoulder height or waist-high full tosses will also be treated as <strong>No Balls</strong>.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold">6. Code of Conduct</h2>
          <p>
            Misconduct, sledging, or abusive behavior will lead to penalties or <strong>match suspension</strong>. <br />
            The <strong>umpire’s decision is final and binding</strong>.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">7. Umpires & Scorers</h2>
          <p>
            Neutral umpires will officiate the match. <br />
            Scoring will be maintained <strong>digitally or manually</strong> using standard scoring sheets.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">8. Match Result</h2>
          <ul className="list-disc ml-6">
            <li>In case of a tie, a <strong>Super Over</strong> will decide the winner.</li>
            <li>In league stages, tied matches may be declared a <strong>draw</strong> based on the format.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Rules;
