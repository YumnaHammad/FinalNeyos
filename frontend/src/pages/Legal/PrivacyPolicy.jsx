import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import '../../styles/Legal.css';

const SECTIONS = [
  { id: 's1', title: '1. The Type of Personal Information We Process and Why We Collect It' },
  { id: 's2', title: '2. How We Use Your Personal Information' },
  { id: 's3', title: '3. Cookies and Other Technologies' },
  { id: 's4', title: '4. How We Share Your Personal Information' },
  { id: 's5', title: '5. Securing Your Personal Information' },
  { id: 's6', title: '6. Your Rights and Retention of Your Personal Information' },
  { id: 's7', title: '7. Your Choices' },
  { id: 's8', title: '8. Children\'s Privacy' },
  { id: 's9', title: '9. Global Operations and Data Transfers' },
  { id: 's10', title: '10. Contact Us' },
  { id: 's11', title: '11. Additional Terms' },
];

export default function PrivacyPolicy() {
  return (
    <div className="legal-page">
      <main className="container legal-page__body">
        <h1 className="legal-page__doc-title">Nexyos OneNexyosID Privacy Policy</h1>
        <p className="legal-page__updated">Last updated: Feb 10, 2025</p>

        <p className="legal-page__intro">
          This Privacy Policy describes how Nexyos (&quot;Nexyos&quot;, &quot;we&quot;, &quot;us&quot;, or
          &quot;our&quot;) collects, uses, discloses, and otherwise processes personal information when you
          register for, access, or use OneNexyosID — our unified account and authentication service for
          Nexyos.com, the Nexyos Partner Portal, project registration programs, developer resources, and
          related online services (collectively, the &quot;Services&quot;). OneNexyosID enables you to sign
          in once and access multiple Nexyos digital properties with a single set of credentials.
        </p>
        <p className="legal-page__intro">
          We are committed to protecting your privacy and handling your personal information in a transparent
          and lawful manner. This policy explains what information we collect, why we collect it, how we use
          and share it, and the choices available to you. By creating a OneNexyosID account, accessing our
          websites, or otherwise using the Services, you acknowledge that you have read and understood this
          Privacy Policy. If you do not agree with our practices, please do not register for or use OneNexyosID
          or the related Services.
        </p>
        <p className="legal-page__intro">
          This Privacy Policy applies to personal information processed through OneNexyosID and associated
          Nexyos web properties linked to your account. It does not apply to third-party websites, applications,
          or services that may be accessed through links on our platforms. Those third parties are responsible
          for their own privacy practices, and we encourage you to review their policies before providing
          personal information to them.
        </p>

        <nav aria-label="Table of contents">
          <ol className="legal-page__toc">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`}>{s.title}</a>
              </li>
            ))}
          </ol>
        </nav>

        <section id="s1">
          <h2>1. The Type of Personal Information We Process and Why We Collect It</h2>
          <p>
            When you register for OneNexyosID, we collect information that you provide directly to us. This
            may include your first and last name, business or organization type (such as installer, system
            integrator, distributor, or reseller), company name, country or region of operation, email address,
            telephone number where applicable, verification codes used to confirm your email, and your partner
            portal registration preferences. We also collect account credentials, including a password that is
            stored using industry-standard hashing and is never retained in plain text.
          </p>
          <p>
            We collect this information to establish and administer your account, authenticate your identity
            when you sign in, enable access to partner programs and restricted resources, process project
            registration requests, respond to support inquiries, and communicate with you about products,
            services, events, and program updates relevant to your business relationship with Nexyos. We may
            also collect technical information automatically when you use the Services, including IP address,
            browser type, device identifiers, session logs, and usage data, in order to maintain security,
            prevent fraud, and improve platform performance.
          </p>
          <p>
            In some cases, we may receive information about you from authorized Nexyos channel partners,
            distributors, or event registrations when you are referred to our platform or when a partner
            submits a project registration on your behalf. We process such information in accordance with
            this Privacy Policy and any applicable agreements between Nexyos and the referring party.
          </p>
        </section>

        <section id="s2">
          <h2>2. How We Use Your Personal Information</h2>
          <p>
            We use the personal information we collect for legitimate business purposes connected to operating
            OneNexyosID and delivering the Services you request. These purposes include providing and
            maintaining your account, enabling single sign-on across Nexyos properties, verifying your email
            address and identity, granting access to partner-only content and tools, and fulfilling project
            registration and sales support workflows initiated through your account.
          </p>
          <p>
            We also use personal information to send transactional communications, such as account confirmation
            messages, password reset notices, security alerts, and responses to your support requests. Where
            you have opted in, we may send marketing communications about Nexyos products, solutions, partner
            programs, webinars, and industry events. You may withdraw marketing consent at any time without
            affecting the lawfulness of processing based on consent before its withdrawal.
          </p>
          <p>Specifically, we may use personal information to:</p>
          <ul>
            <li>Provide, operate, maintain, and improve OneNexyosID and related Services;</li>
            <li>Process partner applications, project registrations, and channel program enrollment;</li>
            <li>Personalize your experience and present relevant product or partner content;</li>
            <li>Monitor, detect, and prevent fraud, abuse, and unauthorized access;</li>
            <li>Conduct analytics, research, and internal reporting to improve our offerings;</li>
            <li>Comply with applicable laws, regulations, legal process, and enforce our terms.</li>
          </ul>
        </section>

        <section id="s3">
          <h2>3. Cookies and Other Technologies</h2>
          <p>
            We use cookies, web beacons, local storage, and similar technologies to recognize you when you
            return to our websites, keep you signed in to OneNexyosID, remember your language and display
            preferences, and understand how visitors interact with our pages. Cookies may be set by Nexyos
            directly or by trusted service providers that assist with analytics, security, and platform
            functionality.
          </p>
          <p>
            You can control cookies through your browser settings and, where available, through our cookie
            preference tools. Please note that disabling certain cookies may limit your ability to use
            OneNexyosID features that depend on session persistence, such as remaining signed in across
            pages or accessing partner portal areas without repeated authentication. We do not use cookies
            to collect sensitive categories of personal information without your knowledge and consent where
            required by applicable law.
          </p>
        </section>

        <section id="s4">
          <h2>4. How We Share Your Personal Information</h2>
          <p>
            Nexyos does not sell your personal information to third parties. We share personal information
            only as described in this Privacy Policy or with your direction or consent. We may share
            information with authorized Nexyos channel partners and distributors when you request to be
            connected with a local partner, submit a project registration, or enroll in a partner program
            that requires referral to a regional representative.
          </p>
          <p>
            We also share information with service providers and contractors who perform services on our
            behalf, such as cloud hosting, email delivery, customer support platforms, analytics providers,
            and identity verification services. These parties are contractually obligated to use personal
            information only for the purposes we specify and to protect it in accordance with applicable
            data protection requirements. We may disclose information to regulators, law enforcement, or
            other parties when we believe disclosure is necessary to comply with law, protect our rights,
            investigate fraud, or ensure the safety of users and the public.
          </p>
        </section>

        <section id="s5">
          <h2>5. Securing Your Personal Information</h2>
          <p>
            We implement administrative, technical, and organizational measures designed to protect personal
            information against unauthorized access, alteration, disclosure, or destruction. These measures
            include access controls, encryption in transit, secure development practices, employee training,
            and periodic review of our security procedures. While we strive to protect your information,
            no method of transmission over the Internet or electronic storage is completely secure, and we
            cannot guarantee absolute security.
          </p>
          <p>
            You play an important role in keeping your account secure. We recommend using a strong, unique
            password for OneNexyosID, enabling multi-factor authentication where offered, not sharing your
            credentials with others, and notifying us promptly at privacy@nexyos.com if you suspect
            unauthorized access to your account. We may suspend or restrict accounts that show signs of
            compromise or misuse to protect you and other users.
          </p>
        </section>

        <section id="s6">
          <h2>6. Your Rights and Retention of Your Personal Information</h2>
          <p>
            Depending on your location and applicable data protection laws, you may have rights to access,
            correct, update, delete, restrict, or object to certain processing of your personal information,
            as well as the right to data portability and to lodge a complaint with a supervisory authority.
            To exercise these rights, contact us using the details in Section 10. We will respond within
            the timeframe required by applicable law and may need to verify your identity before fulfilling
            your request.
          </p>
          <p>
            We retain personal information for as long as your OneNexyosID account remains active or as
            needed to provide the Services, fulfill the purposes described in this Privacy Policy, resolve
            disputes, enforce agreements, and comply with legal, tax, and regulatory obligations. When
            personal information is no longer required, we will delete or anonymize it in accordance with
            our retention schedules and applicable law, unless a longer retention period is required or
            permitted.
          </p>
        </section>

        <section id="s7">
          <h2>7. Your Choices</h2>
          <p>
            You may update certain account information by signing in to OneNexyosID and editing your profile
            settings, where available. You may opt out of marketing emails by clicking the unsubscribe link
            in any promotional message or by contacting us directly. Even if you opt out of marketing, we
            may still send transactional or service-related communications that are necessary for your
            account or ongoing use of the Services.
          </p>
          <p>
            You may request closure of your OneNexyosID account by contacting privacy@nexyos.com. Account
            closure may limit or terminate your access to partner portal resources, registered projects,
            and other Services linked to your credentials. We may retain certain information as required by
            law or for legitimate business purposes, such as maintaining records of transactions or
            resolving disputes, even after account closure.
          </p>
        </section>

        <section id="s8">
          <h2>8. Children&apos;s Privacy</h2>
          <p>
            OneNexyosID and the associated Nexyos business Services are intended for professionals and
            organizations in the security, IoT, and technology industries. They are not directed to individuals
            under the age of 16, and we do not knowingly collect personal information from children. If you
            believe we have inadvertently collected information from a child, please contact us and we will
            take steps to delete such information promptly in accordance with applicable law.
          </p>
        </section>

        <section id="s9">
          <h2>9. Global Operations and Data Transfers</h2>
          <p>
            Nexyos operates globally and may process personal information in countries other than the country
            in which you reside. These countries may have data protection laws that differ from those in your
            jurisdiction. When we transfer personal information internationally, we implement appropriate
            safeguards, such as standard contractual clauses, intra-group agreements, or other mechanisms
            recognized under applicable law, to help ensure your information receives an adequate level of
            protection.
          </p>
          <p>
            By using OneNexyosID, you understand that your information may be transferred to and processed
            in facilities operated by Nexyos or its service providers worldwide. We take steps to ensure
            that recipients of personal information maintain confidentiality and security consistent with
            this Privacy Policy and applicable legal requirements.
          </p>
        </section>

        <section id="s10">
          <h2>10. Contact Us</h2>
          <p>
            If you have questions, concerns, or requests regarding this Privacy Policy or our handling of
            your personal information, please contact us at privacy@nexyos.com or through our{' '}
            <Link to="/contact">contact page</Link>. We will endeavor to respond to legitimate inquiries
            within a reasonable timeframe. If you are located in the European Economic Area, the United Kingdom,
            or other regions with dedicated privacy requirements, you may also have the right to contact your
            local data protection authority regarding our processing of your personal information.
          </p>
        </section>

        <section id="s11">
          <h2>11. Additional Terms</h2>
          <p>
            We may update this Privacy Policy from time to time to reflect changes in our practices,
            technologies, legal requirements, or business operations. When we make material changes, we will
            post the updated policy on this page with a revised &quot;Last updated&quot; date and, where
            required by law, provide additional notice such as email notification or a prominent message
            within OneNexyosID. Your continued use of the Services after the effective date of an updated
            Privacy Policy constitutes your acceptance of the revised terms, unless applicable law requires
            otherwise.
          </p>
          <p>
            This Privacy Policy should be read together with any applicable Terms of Use, partner program
            agreements, and product-specific notices that govern your use of Nexyos Services. In the event of
            a conflict between this Privacy Policy and a signed agreement between you and Nexyos regarding
            a specific program or service, the signed agreement will control with respect to that program or
            service to the extent of the conflict.
          </p>
        </section>

        <Link to="/signup" className="legal-page__back">
          <ArrowLeft size={16} />
          Back to registration
        </Link>
      </main>
    </div>
  );
}
