import React, { useState } from "react";
import { Container, Tab, Tabs, Button } from "react-bootstrap";
import styles from "../../style/ProjectRegistration.module.css";
import Banner from "../../components/BannerRegister";
import Contact from "../../components/Contact";

const ProjectRegistration = () => {
  const [activeTab, setActiveTab] = useState("video");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const downloadForm = () => {
    // This would typically link to a PDF download
    alert("Downloading form...");
  };

  return (
    <>
      <Banner />
      <Container className={styles.container}>
        <h1 className={styles.mainTitle}  data-aos="fade-right">
          Nexyos Project Registration Program
        </h1>

        <Tabs
          activeKey={activeTab}
          onSelect={handleTabChange}
          className={`mb-4 ${styles.customTabs}`}
        >
          <Tab
            eventKey="video"
            title="Video Surveillance Project Registration"
            className={styles.tabContent}
          >
            <div className={styles.tabPanel}>
              <h2 className={styles.tabTitle}  data-aos="fade-right">
                Video Surveillance Project Registration
              </h2>

              <div className={styles.programOverview}>
                <h3 className={styles.sectionTitle}  data-aos="fade-right">Program Overview</h3>
                <p>
                  Nexyos Project Registration Program is to be used by our
                  customers with active agreement to register opportunities or
                  projects which may qualify for additional support.
                </p>
                <p>
                  To register the project, please download and fill out the form
                  below in its entirety and submit via email to{" "}
                  <strong>sales@Nexyos.com</strong> or to your account
                  representative. Nexyos will check the accuracy of the
                  information and will confirm that the project is not already
                  registered.
                </p>
                <p>
                  You will receive an email confirmation within 48 hours that
                  the project has been registered under your name (or that it
                  was already registered) along with the special terms being
                  offered for this specific project.
                </p>
                <p>
                  Approved registrations are valid for 60 days; should you need
                  to extend it, please contact us and refer to the project name.
                </p>
              </div>

              <div className={styles.programSteps}>
                <h3 className={styles.sectionTitle}  data-aos="fade-right">
                  Get Project Support in Three Easy Steps
                </h3>
                <ol className={styles.stepsList}>
                  <li>Find an opportunity to meet a certain amount.</li>
                  <li>Complete and submit a Project Registration Form.</li>
                  <li>
                    Nexyos will verify that all information is complete and will
                    confirm that you have met the program criteria.
                  </li>
                </ol>
              </div>

              <div className={styles.programRequirements}>
                <h3 className={styles.sectionTitle}  data-aos="fade-right">Program Requirements</h3>
                <ul className={styles.requirementsList}>
                  <li>
                    Only ONE Dealer can be registered for a project at any one
                    time.
                  </li>
                  <li>
                    Nexyos products sales must meet Nexyos's criteria. If the
                    registered project order falls below the minimum
                    requirements, the support may not be valid.
                  </li>
                  <li>
                    Registrations need to be received at least 40 days from
                    submission of P.O.
                  </li>
                  <li>Each project requires separate registrations.</li>
                </ul>
              </div>

              <div className={styles.downloadSection}>
                <Button
                  variant="primary"
                  onClick={downloadForm}
                  className={styles.downloadBtn}
                >
                  Download Registration Form
                </Button>
              </div>
            </div>
          </Tab>

          <Tab
            eventKey="iot"
            title="IoT Project Registration"
            className={styles.tabContent}
          >
            <div className={styles.tabPanel}>
              <h2 className={styles.tabTitle}  data-aos="fade-right">IoT Project Registration</h2>

              <div className={styles.programOverview}>
                <h3 className={styles.sectionTitle}  data-aos="fade-right">Program Overview</h3>
                <p>
                  Nexyos Project Registration Program is designed for our
                  customers with active agreements to register opportunities or
                  projects that may be eligible for additional support.
                </p>
                <p>
                  By registering the project, Nexyos can assist in
                  pre-evaluation, and provide support for project follow-up and
                  implementation, thereby increasing the chances of winning the
                  project and exploring more cooperation possibilities. Special
                  benefits will also be given accordingly.
                </p>
                <p>
                  To register the project, please download and fill out the form
                  below and submit via email to{" "}
                  <strong>sales@Nexyos.com</strong>. Our team will verify the
                  information and reach out.
                </p>
                <p>
                  Approved registrations are valid for 90 days; should you need
                  to extend it, please contact us with the project name.
                </p>
              </div>

              <div className={styles.downloadSection}>
                <Button
                  variant="primary"
                  onClick={downloadForm}
                  className={styles.downloadBtn}
                >
                  Download Registration Form
                </Button>
              </div>
            </div>
          </Tab>
        </Tabs>
      </Container>
      <Contact />
    </>
  );
};

export default ProjectRegistration;
