// app/components/LandlordFeesSection.tsx
"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function ManagementFeesSection() {
  return (
    <div>
        <Header/>
   
    <section className="w-full">
      {/* Header Section with Background Image and Blur Effect */}
      <div
        className="relative h-80 flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("/footer-bg.png")',
        }}
      >
        {/* Blur Overlay */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
        
        {/* Title */}
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
            Landlord Management
          </h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            {/* Choosing the area section */}
            <div className="bg-white rounded-lg shadow-lg p-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Choosing the area you&apos;d like to live in
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                Do your research and figure out the specific areas you&apos;d like to rent in. Make a list of the things that are 
                really important to you, like transport links, schools, access to shops and use these to focus your search. 
                Be sure to share your list of &apos;must-haves&apos; and &apos;nice-to-haves&apos; with the local estate agents so they can start 
                working for you.
              </p>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-6">
                Dealing with the estate agents
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                Identify which local agents are marketing the type of property you like in your preferred area/s and make contact with them. Make sure the agent registers you on the system and take care to give them all your contact details - the lettings business is fast-moving and you don't want to miss out on your ideal property.

                Be very clear about when you need to move into your rental property. If you need somewhere urgently, let the agent know. They'll be sympathetic and will do all they can to find you a suitable place.
              </p>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-6">
                Viewing properties
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                Try to be available and as flexible as possible. Yes, we've said it before, but the lettings business is incredibly fast moving and when a good property comes to the market there can be a rush to view and offers are often made immediately. You could miss out if you can't make yourself available within 24 hours of the agent contacting you.

                Don't necessarily be put off by details in the property. If you don't like the wall colour, or the sofa isn't big enough, have a chat with the agent. We encourage our landlords to be flexible and accommodate tenant's requests whenever possible.

                If you want the landlord to undertake any improvement works, or add/remove furniture, put in your request as soon as you decide to make an offer. It can be much harder to get these jobs agreed once you have moved in.
              </p>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-6">
                Dotting the I&apos;s and crossing the T&apos;s
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                Once your offer has been accepted you&apos;ll need to pay a holding deposit to the agent. This is usually the equivalent of 1 weeks&apos; rent. This is then usually deducted from your first month&apos;s rent. Your agent should give you full details on how they handle and process your holding deposit.

                All estate agents will need to conduct security checks on behalf of the landlord, so make sure you have details of all your previous addresses to hand. Likewise, let your employer, and any other referees such as your current Landlord, know to expect a request for a reference.
              </p>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-6">
                Fees and charges
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                When you agree to rent a property you will be expected to pay a security deposit and the first month's rent before you move in. If you are occupying a property under an Assured Shorthold Tenancy Agreement there are only certain fees that an agent or landlord are allowed to charge before, during or after the tenancy ends. All tenants' fees can be found on local offices microsites.

                When you pay the security deposit, the agent will be responsible for putting it into an approved tenancy deposit holding scheme* and they should pass on the details to you - make sure you hold on to these. (* Where you are occupying the property under an Assured Shorthold Tenancy)
              </p>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-6">
                Once in
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                Find out who is managing your property and make sure you have been given all their contact details. That way, if something goes wrong in the property, you'll know who to get in touch with.

                Look after the property as if it were your own. This reduces the likelihood of disputes over damage when the tenancy comes to an end.

                Remember that you should arrange insurance cover for your furnishings and personal property - the landlord is not responsible for insuring these items.
              </p>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-6">
                Moving out
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                Before moving out you should refer to your inventory document that you received when you moved in. This will show the 'condition' of your property and you should be aiming to return the property in the same 'condition' subject to fair wear and tear. This will probably mean thoroughly cleaning the property before the inventory clerk returns to carry out the check out.

                It goes without saying that you should leave the property in tip top condition and remove all your belongings, otherwise you risk losing part, or all of your deposit.
              </p>
              
              {/* Line and Date at Bottom */}
              <div className="mt-12 pt-8 border-t border-gray-300">
                <p className="text-center text-gray-600 text-lg">
                  25 August, 2025
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer/>
     </div>
  );
}