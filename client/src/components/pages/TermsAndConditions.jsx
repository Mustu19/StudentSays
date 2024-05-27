import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4 text-gray-900">
        User Review Terms and Conditions
      </h1>
      <div className="space-y-4 text-gray-700">
        <div>
          <h2 className="text-xl font-semibold">Authenticity</h2>
          <p>
            The user agrees to write only genuine and honest reviews based on
            their own experience. Reviews must not contain any false,
            misleading, or defamatory information.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Proprietary Rights</h2>
          <p>
            By submitting a review, the user grants the platform a
            non-exclusive, perpetual, irrevocable, transferable, sub-licensable,
            royalty-free, worldwide license to use, copy, modify, publish, and
            distribute the review for any purpose.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold">No Conflicts of Interest</h2>
          <p>
            The user represents and warrants that they have no financial or
            other conflicts of interest in writing the review.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Responsibility for Content</h2>
          <p>
            The user is solely responsible for the content of their review and
            any consequences that may result from publishing it.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Compliance with Laws</h2>
          <p>
            The user agrees to comply with all applicable laws and regulations
            while writing and publishing their review.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Right to Remove</h2>
          <p>
            The platform reserves the right to remove any review that violates
            these terms and conditions or is deemed inappropriate, offensive, or
            in violation of any law.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold">No Endorsement</h2>
          <p>
            The platform does not endorse any reviews or the opinions expressed
            by its users.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Indemnification</h2>
          <p>
            The user agrees to indemnify and hold the platform harmless from any
            and all claims, damages, losses, liabilities, and expenses arising
            from the user's review.
          </p>
        </div>
        <div>
          <p>
            By submitting a review, the user acknowledges that they have read,
            understood, and agree to be bound by these terms and conditions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
