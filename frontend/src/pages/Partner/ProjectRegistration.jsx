import { Link } from 'react-router-dom';
import { Container, Tab, Tabs } from 'react-bootstrap';
import styles from '../../style/ProjectRegistration.module.css';
import Contact from '../../components/Contact';
import PartnerDetailLayout, {
  PartnerDetailSection,
  PartnerStepsGrid,
} from '../../components/Partner/PartnerDetailLayout';
import { getPartnerMeta } from '../../config/partnerNav';

const META = getPartnerMeta('/Partner/ProjectRegistration');

const STEPS = [
  { title: 'Identify opportunity', description: 'Find a qualified project that meets minimum program criteria.' },
  { title: 'Submit registration', description: 'Complete the form and email it to sales@nexyos.com or your account rep.' },
  { title: 'Receive confirmation', description: 'Get approval within 48 hours with special terms for your project.' },
];

const REQUIREMENTS = [
  'Only ONE dealer can be registered for a project at any one time.',
  'Nexyos product sales must meet minimum requirements for support to apply.',
  'Registrations must be received at least 40 days before P.O. submission.',
  'Each project requires separate registrations.',
];

export default function ProjectRegistration() {
  const downloadForm = () => {
    window.open('mailto:sales@nexyos.com?subject=Project%20Registration%20Form%20Request', '_blank');
  };

  return (
    <PartnerDetailLayout
      title="Nexyos Project Registration Program"
      shortTitle={META.label}
      subtitle="Register opportunities for additional support, protected pricing, and dedicated Nexyos project assistance."
      image={META.heroImage}
      badge={META.groupTitle}
      relatedGroupId="ecosystem"
      actions={
        <a href="#register" className="partner-detail__btn partner-detail__btn--primary">
          View programs
        </a>
      }
    >
      <PartnerStatsPlaceholder />

      <PartnerDetailSection title="Register in three steps">
        <PartnerStepsGrid steps={STEPS} />
      </PartnerDetailSection>

      <PartnerDetailSection alt id="register">
        <Container className={styles.container}>
          <Tabs defaultActiveKey="video" className={`mb-4 ${styles.customTabs}`}>
            <Tab eventKey="video" title="Video Surveillance">
              <div className={styles.tabPanel}>
                <h2 className={styles.tabTitle}>Video Surveillance Project Registration</h2>
                <div className={styles.programOverview}>
                  <h3 className={styles.sectionTitle}>Program Overview</h3>
                  <p>
                    The Nexyos Project Registration Program is for customers with an active agreement to register opportunities that may qualify for additional support.
                  </p>
                  <p>
                    Download and complete the form below, then submit via email to <strong>sales@nexyos.com</strong> or your account representative.
                  </p>
                  <p>You will receive confirmation within 48 hours along with special terms for the project.</p>
                  <p>Approved registrations are valid for 60 days.</p>
                </div>
                <div className={styles.programRequirements}>
                  <h3 className={styles.sectionTitle}>Program Requirements</h3>
                  <ul className={styles.requirementsList}>
                    {REQUIREMENTS.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                </div>
                <div className={styles.downloadSection}>
                  <button type="button" onClick={downloadForm} className="partner-detail__btn partner-detail__btn--primary" style={{ width: 'auto' }}>
                    Request registration form
                  </button>
                </div>
              </div>
            </Tab>
            <Tab eventKey="iot" title="IoT Project Registration">
              <div className={styles.tabPanel}>
                <h2 className={styles.tabTitle}>IoT Project Registration</h2>
                <div className={styles.programOverview}>
                  <h3 className={styles.sectionTitle}>Program Overview</h3>
                  <p>
                    Register IoT opportunities for pre-evaluation, project follow-up, implementation support, and special partner benefits.
                  </p>
                  <p>
                    Submit the completed form to <strong>sales@nexyos.com</strong>. Our team will verify and reach out.
                  </p>
                  <p>Approved registrations are valid for 90 days.</p>
                </div>
                <div className={styles.downloadSection}>
                  <button type="button" onClick={downloadForm} className="partner-detail__btn partner-detail__btn--primary" style={{ width: 'auto' }}>
                    Request registration form
                  </button>
                </div>
              </div>
            </Tab>
          </Tabs>
        </Container>
      </PartnerDetailSection>

      <PartnerDetailSection>
        <p className="text-center text-muted mb-3">New to Nexyos partnerships?</p>
        <div className="text-center">
          <Link to="/Partner/BecomePartner" className="partner-detail__btn partner-detail__btn--primary" style={{ width: 'auto', display: 'inline-flex' }}>
            Become a partner
          </Link>
        </div>
      </PartnerDetailSection>

      <Contact interestMode="area" />
    </PartnerDetailLayout>
  );
}

function PartnerStatsPlaceholder() {
  return (
    <div className="partner-stats">
      {[
        { value: '48h', label: 'Approval time' },
        { value: '60–90', label: 'Days validity' },
        { value: '1:1', label: 'Project support' },
      ].map((s) => (
        <div key={s.label} className="partner-stats__item">
          <span className="partner-stats__value">{s.value}</span>
          <span className="partner-stats__label">{s.label}</span>
        </div>
      ))}
    </div>
  );
}
