import { useState, type FormEvent } from "react";
import { ArrowRightIcon, CheckCircleIcon } from "@/components/icons/SharedIcons";

export function DemoForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setSubmitted(true);
  }

  return (
    <form className="demo-form anim" id="demoForm" onSubmit={handleSubmit}>
      <div className="f-row">
        <label>
          Full name
          <input type="text" name="name" placeholder="Jordan Miller" required disabled={submitted} />
        </label>
      </div>
      <div className="f-row f-split">
        <label>
          Business name
          <input type="text" name="business" placeholder="Miller Auto Parts" required disabled={submitted} />
        </label>
        <label>
          Phone
          <input type="tel" name="phone" placeholder="(555) 012-3456" disabled={submitted} />
        </label>
      </div>
      <div className="f-row">
        <label>
          Work email
          <input type="email" name="email" placeholder="jordan@yourshop.com" required disabled={submitted} />
        </label>
      </div>
      <div className="f-row">
        <label>
          What are you looking to solve?
          <textarea name="message" rows={3} placeholder="e.g. We list on eBay and Amazon manually and keep overselling." disabled={submitted} />
        </label>
      </div>
      <button type="submit" className="btn-submit" disabled={submitted}>
        Request My Demo <ArrowRightIcon size={16} />
      </button>
      <p className="f-note">We'll get back to you within one business day.</p>
      <div className={`f-success${submitted ? " is-visible" : ""}`} id="formSuccess" hidden={!submitted}>
        <CheckCircleIcon />
        <span>Thanks! We'll be in touch within one business day.</span>
      </div>
    </form>
  );
}
