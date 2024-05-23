import React from "react";

const About = () => {
  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-col px-5 py-12 justify-center items-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900 text-center">
            About Us
          </h1>
          <p className="mb-8 leading-relaxed text-center w-full md:w-2/3">
            StudentSays is dedicated to empowering students with honest college
            reviews and personalized rank predictions. We aim to provide a
            platform where students can share their genuine experiences and
            insights, helping others make informed decisions about their
            educational journeys.
          </p>
          <h2 className="title-font sm:text-2xl text-xl mb-4 font-medium text-gray-900 text-center">
            Founder
          </h2>
          <img
            className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded"
            alt="founders"
            src="https://dummyimage.com/720x600"
          />
          <div className="w-full md:w-2/3 flex flex-col mb-16 items-center text-center">
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://img.icons8.com/ios-filled/50/000000/facebook-new.png"
                  alt="Facebook"
                  className="w-8 h-8"
                />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://img.icons8.com/ios-filled/50/000000/twitter.png"
                  alt="Twitter"
                  className="w-8 h-8"
                />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://img.icons8.com/ios-filled/50/000000/linkedin.png"
                  alt="LinkedIn"
                  className="w-8 h-8"
                />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://img.icons8.com/ios-filled/50/000000/instagram-new.png"
                  alt="Instagram"
                  className="w-8 h-8"
                />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
