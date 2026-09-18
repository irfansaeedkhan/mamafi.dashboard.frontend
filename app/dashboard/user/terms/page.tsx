'use client';

import { ProfileCommonTop } from '@/components/profile';

const TermsAndConditions = () => {
  function back() {
    window.history.back();
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="block w-full lg:hidden">
        <ProfileCommonTop />
      </div>
      <div className="z-10 flex flex-col rounded-xl box-3d px-6 py-5 font-inter text-white">
        <div className="flex flex-col items-start justify-between gap-2 pt-6 lg:flex-row lg:items-center lg:gap-5 lg:pb-10">
          <h1 className="text-lg text-white lg:text-xl">Terms & Conditions</h1>
          <h2>
            Mamafi Club
            <br /> Last Updated: 24-06-25
          </h2>
        </div>

        <div className="flex flex-col gap-4 pt-5">
          <div className="flex flex-col gap-1">
            <h3 className="text-lg text-white">1. Club Identity</h3>
            <p className="whitespace-pre-wrap text-sm leading-6 text-white">
            Mamafi is a private, almost anonymous, and unconventional circle, created for individuals
              who can envision new forms of interaction between artificial intelligence,
              decentralized finance, and collective initiative. Access is by direct personal
              invitation only, issued by an existing member. No public access, no advertising, no
              public claims.
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-lg text-white">2. The Concept of Sigillum</h3>
            <p className="whitespace-pre-wrap text-sm leading-6 text-white">
              Sigillum is not a currency, a token, or a financial asset. Sigillum is a collective
              commitment—a symbolic act of joining a vision. By becoming a member of the Club, you
              are co-funding the development and deployment of AI intelligence used to generate
              high-potential strategies in decentralized markets. Your contribution is not a
              &apos;share&apos; nor a &apos;purchase.&apos; It is a conscious gesture that sustains
              this invisible yet powerful infrastructure.
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-lg text-white">3. Membership & Access</h3>
            <ul className="list-none pl-0">
              <li className={listStyle}>
                <p className="whitespace-pre-wrap text-sm leading-6 text-white">
                  Entry is strictly by direct referral. No unsolicited applications will be
                  considered.
                </p>
              </li>
              <li className={listStyle}>
                <p className="whitespace-pre-wrap text-sm leading-6 text-white">
                  The Club reserves the right to admit, suspend, or remove any member at its sole
                  discretion.
                </p>
              </li>
              <li className={listStyle}>
                <p className="whitespace-pre-wrap text-sm leading-6 text-white">
                  Access to the Club requires full and unconditional acceptance of these Terms &
                  Conditions.
                </p>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-lg text-white">4. Participation & Risk</h3>
            <ul className="list-none pl-0">
              <li className={listStyle}>
                <p className="whitespace-pre-wrap text-sm leading-6 text-white">
                  Funds contributed support the computational power and AI-driven systems employed
                  in DeFi and crypto environments.
                </p>
              </li>
              <li className={listStyle}>
                <p className="whitespace-pre-wrap text-sm leading-6 text-white">
                  Returns are highly speculative, unpredictable, and extremely volatile.
                </p>
              </li>
              <li className={listStyle}>
                <p className="whitespace-pre-wrap text-sm leading-6 text-white">
                  Capital may be lost entirely.
                </p>
              </li>
              <li className={listStyle}>
                <p className="whitespace-pre-wrap text-sm leading-6 text-white">
                  By joining, the Member acknowledges that they are engaging in a high-risk
                  environment, without any regulatory protection, in the spirit of a dangerous game
                  where intuition is the only real capital.
                </p>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-lg text-white">5. Nature of the Club</h3>
            <ul className="list-none pl-0">
              <li className={listStyle}>
                <p className="whitespace-pre-wrap text-sm leading-6 text-white">
                  The Club is not an investment company.
                </p>
              </li>
              <li className={listStyle}>
                <p className="whitespace-pre-wrap text-sm leading-6 text-white">
                  The Club does not professionally manage capital.
                </p>
              </li>
              <li className={listStyle}>
                <p className="whitespace-pre-wrap text-sm leading-6 text-white">
                  The Club does not offer financial advice.
                </p>
              </li>
              <li className={listStyle}>
                <p className="whitespace-pre-wrap text-sm leading-6 text-white">
                  It operates as an informal and cultural network for individuals exploring
                  speculative strategies led by algorithmic intelligence.
                </p>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-lg text-white">6. Privacy & Anonymity</h3>
            <ul className="list-none pl-0">
              <li className={listStyle}>
                <p className="whitespace-pre-wrap text-sm leading-6 text-white">
                  Every member commits to absolute discretion regarding the Club&apos;s existence,
                  structure, and members.
                </p>
              </li>
              <li className={listStyle}>
                <p className="whitespace-pre-wrap text-sm leading-6 text-white">
                  Member identity is kept private and never disclosed to third parties.
                </p>
              </li>
              <li className={listStyle}>
                <p className="whitespace-pre-wrap text-sm leading-6 text-white">
                  Financial participation is processed through encrypted or blockchain-based
                  channels at the Club&apos;s discretion.
                </p>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-lg text-white">7. Returns & Transparency</h3>
            <ul className="list-none pl-0">
              <li className={listStyle}>
                <p className="whitespace-pre-wrap text-sm leading-6 text-white">
                  No returns are promised or guaranteed.
                </p>
              </li>
              <li className={listStyle}>
                <p className="whitespace-pre-wrap text-sm leading-6 text-white">
                  Any financial flows resulting from AI activity are distributed according to
                  discretionary, algorithmic, or experimental logic, shared only through private
                  channels.
                </p>
              </li>
              <li className={listStyle}>
                <p className="whitespace-pre-wrap text-sm leading-6 text-white">
                  No requests for audits, transparency, or accounting will be honored: those who
                  join do so on the basis of trust and vision—not entitlement.
                </p>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-lg text-white">8. Limitation of Liability</h3>
            <ul className="list-none pl-0">
              <li className={listStyle}>
                <p className="whitespace-pre-wrap text-sm leading-6 text-white">
                  The Club is not liable for any losses, frozen funds, hacks, bugs, or service
                  interruptions.
                </p>
              </li>
              <li className={listStyle}>
                <p className="whitespace-pre-wrap text-sm leading-6 text-white">
                  All internal operational decisions are final and non-negotiable.
                </p>
              </li>
              <li className={listStyle}>
                <p className="whitespace-pre-wrap text-sm leading-6 text-white">
                  By participating, you waive any and all legal claims, complaints, or arbitration
                  against the Club or its initiators.
                </p>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-lg text-white">9. Applicable Law</h3>
            <ul className="list-none pl-0">
              <li className={listStyle}>
                <p className="whitespace-pre-wrap text-sm leading-6 text-white">
                  This agreement is not subject to any formal legal jurisdiction.
                </p>
              </li>
              <li className={listStyle}>
                <p className="whitespace-pre-wrap text-sm leading-6 text-white">
                  Interactions are governed by the principle of mutual self-determination, without
                  mediation or oversight.
                </p>
              </li>
              <li className={listStyle}>
                <p className="whitespace-pre-wrap text-sm leading-6 text-white">
                  Anyone seeking formal legal frameworks or protections is not welcome in the Club.
                </p>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-lg text-white">10. Final Clause</h3>
            <p className="whitespace-pre-wrap text-sm leading-6 text-white">
              Those who enter Mamafi know what they&apos;re stepping into. Do not seek safety. Do
              not expect stability. This is a place for explorers of the unknown—those willing to
              risk everything to gain what cannot be explained. Welcome to the Club.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;

const listStyle = ` flex items-start before:mr-2 before:mt-2 before:inline-block before:h-2 before:w-2 before:shrink-0 before:rounded-full before:bg-brand-gold before:content-[''] `;
