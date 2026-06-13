import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import '../../styles/Legal.css';

const SECTIONS = [
  { id: 's1', title: '1. Acceptance of Terms' },
  { id: 's2', title: '2. Description of Services' },
  { id: 's3', title: '3. Account Registration and Eligibility' },
  { id: 's4', title: '4. User Responsibilities and Acceptable Use' },
  { id: 's5', title: '5. Partner Programs and Project Registration' },
  { id: 's6', title: '6. Intellectual Property Rights' },
  { id: 's7', title: '7. Confidentiality and Data Protection' },
  { id: 's8', title: '8. Disclaimers and Limitation of Liability' },
  { id: 's9', title: '9. Suspension and Termination' },
  { id: 's10', title: '10. Governing Law and Dispute Resolution' },
  { id: 's11', title: '11. Changes to These Terms' },
  { id: 's12', title: '12. Contact Us' },
];

export default function TermsAndConditions() {
  return (
    <div className="legal-page">
      <main className="container legal-page__body">
        <h1 className="legal-page__doc-title">Nexyos OneNexyosID Terms and Conditions</h1>
        <p className="legal-page__updated">Last updated: Feb 10, 2025</p>

        <p className="legal-page__intro">
          These Terms and Conditions (&quot;Terms&quot;) govern your access to and use of OneNexyosID and
          related Nexyos online services, including Nexyos.com, the Nexyos Partner Portal, project registration
          programs, developer resources, product documentation, and any other digital properties that require
          or are accessed through a OneNexyosID account (collectively, the &quot;Services&quot;). OneNexyosID
          is Nexyos&apos;s unified account and authentication platform that allows authorized users to sign
          in once and access multiple Nexyos business tools with a single set of credentials.
        </p>
        <p className="legal-page__intro">
          By registering for, accessing, or using OneNexyosID or any of the Services, you agree to be bound by
          these Terms and by our{' '}
          <Link to="/privacy-policy">Privacy Policy</Link>, which describes how we collect and process personal
          information. If you are registering or using the Services on behalf of a company, organization, or
          other legal entity, you represent that you have authority to bind that entity to these Terms, and
          &quot;you&quot; refers to both you individually and that entity. If you do not agree to these Terms,
          you must not register for or use OneNexyosID or the related Services.
        </p>
        <p className="legal-page__intro">
          These Terms apply to all users of OneNexyosID, including channel partners, system integrators,
          distributors, resellers, developers, and other business professionals who interact with Nexyos
          through our digital platforms. Certain partner programs, product purchases, or signed agreements
          between you and Nexyos may include additional terms that supplement or, where expressly stated,
          override provisions of these Terms with respect to those specific programs or transactions.
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
          <h2>1. Acceptance of Terms</h2>
          <p>
            Your use of OneNexyosID constitutes your acceptance of these Terms and your agreement to comply
            with all applicable laws and regulations. Nexyos may modify these Terms at any time by posting an
            updated version on this page with a revised &quot;Last updated&quot; date. Material changes may
            also be communicated through email, in-platform notices, or other reasonable means. Your continued
            use of the Services after the effective date of any modification constitutes acceptance of the
            updated Terms, unless applicable law requires your explicit consent for certain changes.
          </p>
          <p>
            If you do not agree to modified Terms, you must discontinue use of OneNexyosID and may request
            closure of your account in accordance with Section 9. Nexyos reserves the right to refuse
            registration, suspend access, or terminate accounts at its discretion where permitted by law,
            including when these Terms are violated or when use of the Services poses a security, legal, or
            operational risk to Nexyos or other users.
          </p>
        </section>

        <section id="s2">
          <h2>2. Description of Services</h2>
          <p>
            OneNexyosID provides account creation, authentication, and single sign-on capabilities that
            enable access to Nexyos websites, partner portals, project registration workflows, technical
            resources, and related business tools. The specific features available to you may depend on your
            user type, geographic region, partner program enrollment, and the permissions assigned to your
            account by Nexyos or an authorized channel administrator.
          </p>
          <p>
            Nexyos may add, modify, suspend, or discontinue any aspect of the Services at any time, with or
            without notice, to improve functionality, comply with legal requirements, or address security
            concerns. We do not guarantee uninterrupted or error-free operation of OneNexyosID or any linked
            platform. Scheduled maintenance, system upgrades, and events beyond our reasonable control may
            temporarily affect availability of the Services.
          </p>
        </section>

        <section id="s3">
          <h2>3. Account Registration and Eligibility</h2>
          <p>
            To use OneNexyosID, you must provide accurate, current, and complete registration information,
            including your name, business email address, organization type, company name, and country or
            region of operation, as requested during signup. You agree to promptly update your account
            information when it changes so that Nexyos can maintain accurate records and communicate with you
            effectively regarding partner programs, project registrations, and service notifications.
          </p>
          <p>
            OneNexyosID is intended for business and professional use. You must be at least 16 years of age
            and have the legal capacity to enter into binding agreements in your jurisdiction. You are
            responsible for maintaining the confidentiality of your account credentials and for all activities
            that occur under your account, whether authorized by you or not. You must notify Nexyos
            immediately at legal@nexyos.com if you become aware of any unauthorized use of your account or
            any other breach of security.
          </p>
          <p>
            Nexyos may require email verification, additional identity checks, or approval from a regional
            partner or Nexyos representative before granting access to restricted areas of the Partner Portal
            or certain program features. We reserve the right to reject or revoke registration where
            information provided is inaccurate, incomplete, or inconsistent with our eligibility criteria
            for business users.
          </p>
        </section>

        <section id="s4">
          <h2>4. User Responsibilities and Acceptable Use</h2>
          <p>
            You agree to use OneNexyosID and the Services only for lawful business purposes related to your
            relationship with Nexyos or authorized Nexyos partners. You must not use the Services to transmit
            harmful code, attempt unauthorized access to Nexyos systems or third-party networks, interfere with
            the operation of the platform, scrape or harvest data in violation of applicable terms, impersonate
            another person or entity, or engage in fraudulent, abusive, or misleading conduct.
          </p>
          <p>
            You must not share, sell, or transfer your OneNexyosID credentials to unauthorized third parties.
            Shared or generic accounts are prohibited unless expressly permitted under a written agreement with
            Nexyos. You are responsible for ensuring that anyone accessing the Services through your account
            complies with these Terms. Nexyos may monitor use of the Services to enforce these Terms, protect
            platform integrity, and comply with legal obligations, subject to our Privacy Policy.
          </p>
          <p>Without limiting the foregoing, you agree not to:</p>
          <ul>
            <li>Reverse engineer, decompile, or attempt to extract source code from the Services except as permitted by law;</li>
            <li>Use automated means to access the Services in a manner that burdens or disrupts infrastructure;</li>
            <li>Upload or distribute content that infringes intellectual property or violates applicable law;</li>
            <li>Misrepresent your affiliation with Nexyos, partners, or end customers;</li>
            <li>Circumvent access controls, authentication mechanisms, or usage limits.</li>
          </ul>
        </section>

        <section id="s5">
          <h2>5. Partner Programs and Project Registration</h2>
          <p>
            Access to Nexyos partner programs, channel benefits, project registration tools, and related
            commercial terms may require separate enrollment, approval, or execution of program-specific
            agreements. Submission of a partner application or project registration through OneNexyosID does
            not guarantee acceptance, pricing approval, or allocation of resources. Nexyos and its authorized
            channel partners reserve the right to approve, modify, or reject submissions based on business
            criteria, territory coverage, product availability, and compliance requirements.
          </p>
          <p>
            Information you submit in connection with partner programs or project registrations must be accurate
            and complete. You represent that you have authority to submit project details on behalf of your
            organization and any end customer referenced in a registration. Misrepresentation of project scope,
            end-user identity, competitive status, or pricing eligibility may result in rejection of the
            registration, suspension of program benefits, or termination of your account, in addition to any
            remedies available under applicable partner agreements or law.
          </p>
        </section>

        <section id="s6">
          <h2>6. Intellectual Property Rights</h2>
          <p>
            All content, software, trademarks, logos, documentation, and other materials made available
            through OneNexyosID and the Services are owned by Nexyos or its licensors and are protected by
            intellectual property laws. Except as expressly authorized in writing by Nexyos or under a
            separate license agreement, you may not copy, modify, distribute, publicly display, or create
            derivative works from Nexyos materials. Limited use of Nexyos marketing assets, product
            specifications, and partner resources may be permitted under applicable partner program guidelines.
          </p>
          <p>
            Feedback, suggestions, or ideas you submit regarding the Services may be used by Nexyos without
            restriction or compensation to you, except where prohibited by law. You retain ownership of
            content you upload to the Services, but grant Nexyos a non-exclusive, worldwide, royalty-free
            license to use, store, and process such content as necessary to operate the Services, fulfill
            partner workflows, and comply with legal obligations.
          </p>
        </section>

        <section id="s7">
          <h2>7. Confidentiality and Data Protection</h2>
          <p>
            You may receive confidential or proprietary information through the Partner Portal, project
            registration systems, or other restricted areas of the Services. You agree to protect such
            information using at least the same degree of care you use to protect your own confidential
            information, and not to disclose it to unauthorized third parties except as required to perform
            your authorized business activities with Nexyos or as permitted under applicable agreements.
          </p>
          <p>
            Personal information processed through OneNexyosID is handled in accordance with our{' '}
            <Link to="/privacy-policy">Privacy Policy</Link>. You are responsible for ensuring that any
            personal information you provide about employees, customers, or contacts has been collected and
            shared in compliance with applicable data protection laws, and that you have obtained any required
            notices or consents before submitting such information to Nexyos.
          </p>
        </section>

        <section id="s8">
          <h2>8. Disclaimers and Limitation of Liability</h2>
          <p>
            THE SERVICES ARE PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS WITHOUT
            WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING IMPLIED WARRANTIES OF
            MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT. NEXYOS DOES NOT
            WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED, SECURE, OR FREE OF ERRORS, OR THAT DEFECTS WILL
            BE CORRECTED. YOU USE ONE NEXYOSID AND THE SERVICES AT YOUR OWN RISK.
          </p>
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, NEXYOS AND ITS AFFILIATES, OFFICERS, DIRECTORS,
            EMPLOYEES, AGENTS, AND LICENSORS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
            CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR FOR ANY LOSS OF PROFITS, REVENUE, DATA, OR BUSINESS
            OPPORTUNITIES ARISING OUT OF OR RELATED TO YOUR USE OF OR INABILITY TO USE THE SERVICES, EVEN IF
            NEXYOS HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. IN JURISDICTIONS WHERE LIMITATION OF
            LIABILITY IS NOT PERMITTED TO THE FULL EXTENT STATED HERE, NEXYOS&apos;S LIABILITY SHALL BE
            LIMITED TO THE GREATEST EXTENT ALLOWED BY LAW.
          </p>
        </section>

        <section id="s9">
          <h2>9. Suspension and Termination</h2>
          <p>
            Nexyos may suspend or terminate your access to OneNexyosID immediately, with or without notice,
            if you breach these Terms, engage in fraudulent or abusive conduct, pose a security risk, or if
            required by law or regulatory authority. Upon termination, your right to use the Services ceases,
            and Nexyos may delete or deactivate your account and associated data in accordance with our
            Privacy Policy and applicable retention obligations.
          </p>
          <p>
            You may request closure of your OneNexyosID account at any time by contacting legal@nexyos.com.
            Account closure may affect your access to partner portal resources, registered projects, and other
            Services linked to your credentials. Sections of these Terms that by their nature should survive
            termination — including intellectual property, confidentiality, disclaimers, limitation of
            liability, and governing law — will remain in effect after termination.
          </p>
        </section>

        <section id="s10">
          <h2>10. Governing Law and Dispute Resolution</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws applicable in the
            jurisdiction designated by Nexyos for your region or, where no regional designation applies, the
            laws of the jurisdiction in which Nexyos&apos;s principal place of business is located, without
            regard to conflict-of-law principles. Any dispute arising out of or relating to these Terms or
            the Services shall first be addressed through good-faith negotiation between the parties.
          </p>
          <p>
            If a dispute cannot be resolved through negotiation within a reasonable period, it may be submitted
            to binding arbitration or the courts of competent jurisdiction as specified in a separate written
            agreement between you and Nexyos, or as required by applicable law. Nothing in this section limits
            either party&apos;s right to seek injunctive or equitable relief to protect intellectual property
            or confidential information.
          </p>
        </section>

        <section id="s11">
          <h2>11. Changes to These Terms</h2>
          <p>
            Nexyos may revise these Terms periodically to reflect changes in our Services, business practices,
            legal requirements, or industry standards. We will post the updated Terms on this page and update
            the &quot;Last updated&quot; date. Where required by law or where changes materially affect your
            rights, we may provide additional notice through email or prominent in-platform messaging. Your
            continued use of OneNexyosID after the effective date of revised Terms constitutes acceptance,
            unless applicable law requires otherwise.
          </p>
          <p>
            In the event of a conflict between these Terms and a signed agreement between you and Nexyos
            governing a specific partner program, product sale, or service engagement, the signed agreement
            will control with respect to that program or engagement to the extent of the conflict.
          </p>
        </section>

        <section id="s12">
          <h2>12. Contact Us</h2>
          <p>
            If you have questions about these Terms and Conditions, please contact us at legal@nexyos.com or
            through our <Link to="/contact">contact page</Link>. For privacy-related inquiries, please refer
            to our <Link to="/privacy-policy">Privacy Policy</Link> or contact privacy@nexyos.com. We will
            endeavor to respond to legitimate inquiries within a reasonable timeframe.
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
