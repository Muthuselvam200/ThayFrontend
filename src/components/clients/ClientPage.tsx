// ClientPage.js
import "../../index.css";

const ClientPage = () => {
  const imageCount = 24;

  const images = Array.from(
    { length: imageCount },
    (_, index) => `${index + 1}.jpg`
  );

  return (
    <section className="py-3 py-md-5 py-xl-8">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-12 col-md-6 mb-4 mb-md-0">
            <h3 className="fs-1 mb-2 text-secondary">Our Clients</h3>
            <h2
              className="display-5 mb-2 text-secondary"
              style={{ fontSize: "18px" }}
            >
              We have crossed different levels of milestones in a very short
              span of time which enabled us to compete with leading industries
              in the field. We enable organizations to improve quality and
              predictability while reducing time-to-market and overall cost. Our
              technical teams frequently deliver the corporate training and
              technical consulting directly or through other preferred vendors
              for the list of clients below.
            </h2>
          </div>
          <div className="col-12 col-md-6">
            <img
              src="src/assets/images/web-des.jpg"
              alt="ClientsPageImage"
              className="img-fluid"
              style={{ borderRadius: "5px" }}
            />
          </div>
        </div>

        <div className="client-images-container mt-5">
          <div className="scrolling-wrapper">
            <div className="image-set">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={`src/assets/images/${image}`}
                  alt={`Client ${index + 1}`}
                  className="client-image"
                />
              ))}
            </div>
            <div className="image-set">
              {images.map((image, index) => (
                <img
                  key={index + imageCount}
                  src={`src/assets/images/${image}`}
                  alt={`${index + 1}`}
                  className="client-image"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientPage;
