import InquiryForm from './InquiryForm';
import GetInTouch from './GetInTouch';
import '../../styles/InquiryForm.css';

export default function ContactSection({
  showSidebar = true,
  interestMode = 'product',
  interestOptions,
  defaultInterest = '',
  defaultMessage = '',
  className = '',
}) {
  return (
    <section className={`inquiry-section ${className}`.trim()}>
      <div className="container">
        <div className={`inquiry-section__layout${showSidebar ? '' : ' inquiry-section__layout--full'}`}>
          <InquiryForm
            interestMode={interestMode}
            interestOptions={interestOptions}
            defaultInterest={defaultInterest}
            defaultMessage={defaultMessage}
          />
          {showSidebar && <GetInTouch />}
        </div>
      </div>
    </section>
  );
}
