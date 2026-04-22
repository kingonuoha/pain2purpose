"use client";

export function ConsultationSection() {
    return (
        <section className="consultation_section section_space_lg">
            <div className="container">
                <div className="consultation_form_wrap" style={{ backgroundColor: 'var(--bs-primary-bg-subtle)', borderRadius: 'var(--bs-border-radius)', padding: '60px', position: 'relative', overflow: 'hidden' }}>
                    <div className="section_heading text-center">
                        <h2 className="section_heading_text italic">
                            Get your first free <span style={{ color: 'var(--bs-primary)' }}>online consultation</span>
                        </h2>
                    </div>
                    <form action="#">
                        <div className="row g-4">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="input_name">Full Name</label>
                                    <input className="form-control" id="input_name" type="text" name="name" placeholder="Your Name" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="input_phone">Phone Number</label>
                                    <input className="form-control" id="input_phone" type="tel" name="phone" placeholder="Mobile phone number" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="input_therapy">Choose Section</label>
                                    <select className="form-select" id="input_therapy" name="therapy">
                                        <option value="" disabled>Select Therapy</option>
                                        <option value="individual">Individual Therapy</option>
                                        <option value="couples">Couples Counseling</option>
                                        <option value="family">Family Transitions</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="input_date">Session Date</label>
                                    <input className="form-control" id="input_date" type="date" name="date" />
                                </div>
                            </div>
                            <div className="col-12 text-center">
                                <button className="btn btn-primary" type="submit">
                                    <span className="btn_text" data-text="Get A Consultation">Get A Consultation</span>
                                    <span className="btn_icon"><i className="fa-solid fa-arrow-up-right"></i></span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default ConsultationSection;
