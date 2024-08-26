import React from "react";

const AboutUs = () => {
  return (
    <div className="p-6 md:p-12 mt-12 max-w-5xl mx-auto bg-gray-50">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
        About Us
      </h1>

      {/* Introduction */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome to Our Bookstore
        </h2>
        <p className="text-lg text-gray-600 leading-relaxed">
          At Online Book Store, we are passionate about bringing you the best
          selection of books and creating a cozy place for book lovers to
          explore.
        </p>
      </section>

      {/* Mission Statement */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
        <p className="text-lg text-gray-600 leading-relaxed">
          Our mission is to foster a love of reading by providing a diverse
          collection of books, exceptional customer service, and a welcoming
          environment.
        </p>
      </section>

      {/* History */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Story</h2>
        <p className="text-lg text-gray-600 leading-relaxed">
          Founded in 2024, Online Book Store began with a simple vision of
          offering a curated selection of books to our community. Over the
          years, we have grown and evolved, but our commitment to quality and
          service remains steadfast.
        </p>
      </section>

      {/* Team */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Meet the Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Example Team Member */}
          <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <img
              src="https://forumstatic.oneplusmobile.com/opforum-gl/upload/image/front/thread/20220615/2168721/1089236994611478534/1089236994611478534.jpg?x-ocs-process=image/format,webp/resize,w_1000"
              alt="Suman Karki"
              className="w-24 h-24 rounded-full border-4 border-gray-300 mb-4"
            />
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-gray-800">
                Suman Karki
              </h3>
              <p className="text-lg text-gray-600">Founder</p>
            </div>
          </div>
          {/* Repeat for other team members */}
        </div>
      </section>

      {/* Values */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Values</h2>
        <ul className="list-disc list-inside pl-6 text-lg text-gray-600">
          <li className="mb-2">Commitment to Quality</li>
          <li className="mb-2">Customer-Centric Approach</li>
          <li className="mb-2">Community Engagement</li>
        </ul>
      </section>

      {/* Contact Information */}
      <section>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Contact Us</h2>
        <p className="text-lg text-gray-600">
          Address: Baluwatar-4, Kathmandu <br />
          Phone: +977 9862****** <br />
          Email: karki******@gmail.com
        </p>
      </section>
    </div>
  );
};

export default AboutUs;
