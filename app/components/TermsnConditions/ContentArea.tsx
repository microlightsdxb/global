"use client"
import React from 'react'
import { motion } from "framer-motion";
import { staggerContainer, moveUp } from '../scrollanims';
export default function ContentArea() {
  return (
    <motion.section variants={staggerContainer} initial="hidden" animate="show" viewport={{ once: true, amount: 0.2 }} className="section-spacing">
      <motion.div variants={moveUp} className="container">
        <div className="pt-16 pb-150 border-b border-black ">
          <div className="mx-auto p-6 bg-white text-black">
            <h1 className="text-2xl mb-8 md:mb-12 leading-[1.3]">MICROLIGHTS LIGHTING LLC<br/>WEBSITE TERMS AND CONDITIONS</h1>
            <p className="mb-4">Welcome to our Website www.microlights.com (“Website”). This Website is operated by Microlights Lighting LLC (“Microlights”) (also referred to as “us”, “we”, “our” in these Terms and Conditions). Please read these Terms and Conditions carefully, they govern your access and use of the Website. The Website is provided for your personal use subject to these Terms and Conditions and any other rules posted on the Website (including our Privacy Policy and Cookie Policy) – (together “Terms and Conditions”). These Terms and Conditions apply to all users of this Website including without limitation users who are browsers, vendors, customers, merchants, and/or contributors of Content. By continuing to use or view the Website, and/or use any of the services on the Website, you agree to be bound by, comply with and consent to the practices described in these Terms and Conditions.</p>
            <p className="mb-4">We may change these Terms and Conditions from time to time without notice to you by posting the updated Terms and Conditions on the Website, so please ensure that you check for updates on a regular basis.</p>
            <p className="mb-4 font-semibold">NOTE: IF YOU DO NOT AGREE TO BE BOUND BY THESE TERMS AND CONDITIONS, PLEASE DO NOT USE/VIEW THE WEBSITE.</p>
            <p className="mb-4">Microlights offers a variety of lighting products and design services which are not directly available for sale via this Website. The Website displays only a limited selection of our lighting products and therefore, should you require a specific product that is not displayed, or require further assistance, you are advised to speak with us direct either via email or via telephone on the details appearing in the Contact section of the Website. Please note, that the sale of all of our products are subject to our standard terms and conditions of purchase which appear on the reverse side of our Purchase Orders, and/or any additional terms and conditions as agreed between us and a respective buyer.</p>
            <p className="mb-4">Our Design services are offered and agreed between us and a respective client on a case-by-case basis.</p>
            <h2 className="text-lg font-semibold mt-8 mb-4">1. Definitions and Interpretation</h2>
            <p className="mb-4">The words and expressions listed hereunder have the meaning assigned to them respectively for all purposes relating to these Terms and Conditions:</p>
            <ul className="list-disc list-inside mb-4">
              <li><strong>Content:</strong> is defined as any graphics, photographs, including all image rights, sounds, music, video, audio, text or other materials displayed on the Website.</li>
              <li><strong>Intellectual Property Rights:</strong> means copyright, trademarks (registered and unregistered), designs, all rights in relation to inventions (including patent rights, semi-conductor or circuit layout rights), confidential information (including trade secrets and know how) and any other rights resulting from intellectual activity in the industrial, scientific, literary or artistic fields in existence now, or which may come into existence in the future, in relation to the Content.</li>
              <li><strong>UAE:</strong> means the United Arab Emirates.</li>
            </ul>
            <h2 className="text-lg font-semibold mt-6 mb-2">2. Submission of Information and Privacy Policy</h2>
            <p className="mb-4">Any information submitted voluntarily to Microlights via the contact form on the Website shall be deemed and remain the property of Microlights, who shall only use the information in accordance with any obligations of confidentiality or privacy relating to the submitted information as agreed by Microlights, or specifically set forth on the Website in its Privacy Policy and Cookies Policy, or as otherwise specifically agreed or required by law. Please refer to the Website Privacy Policy and Cookies Policy for more details which can be found at <a href="https://www.microlights.com" className="text-blue-600 underline">https://www.microlights.com</a>.</p>
            <h2 className="text-lg font-semibold mt-6 mb-2">3. Intellectual Property</h2>
            <p className="mb-4">3.1 All Intellectual Property Rights in the Content and materials displayed and included on the Website, are either the sole property of Microlights and/ or its affiliates, or are licensed for use by Microlights and are protected to the fullest extent by applicable trademark, copyright and database laws, and all such rights are reserved. By using the Website and its Content, Microlights does not grant you any copyright, design, trademark or other Intellectual Property Rights relating to the Content, including any software, HTML or other codes contained within the Website. You are permitted to use the Content only as expressly authorised by Microlights. Any reproduction or redistribution of the Content is prohibited and may result in civil and criminal penalties...</p>

            <p className="mb-4">3.2 The use and registration of the Microlights name and logo is exclusively reserved to us...</p>

            <h2 className="text-lg font-semibold mt-6 mb-2">4. Use of Information and Materials and No Warranty</h2>
            <p className="mb-4">4.1 As mentioned above, the information and materials contained on the Website, these Terms and Conditions and descriptions that appear, are subject to change...</p>
            <p className="mb-4">4.2 To the full extent permitted by law, we do not warrant the accuracy, validity, currency, adequacy or completeness of the Content...</p>

            <h2 className="text-lg font-semibold mt-6 mb-2">5. Links to Third Party Websites</h2>
            <p className="mb-4">5.1 The Website may contain hyperlinks to websites operated by third parties...</p>
            <p className="mb-4">5.2 We are not liable for any harm or damages related to the purchase or use of goods...</p>

            <h2 className="text-lg font-semibold mt-6 mb-2">6. Exclusion of Liability</h2>
            <p className="mb-4">In no event will we be liable for any damages, including without limitation, direct or indirect...</p>

            <h2 className="text-lg font-semibold mt-6 mb-2">7. Indemnity</h2>
            <p className="mb-4">As a user of the Website, you agree to indemnify us from and against all liabilities...</p>

            <h2 className="text-lg font-semibold mt-6 mb-2">8. Limitations on Use</h2>
            <p className="mb-4">As a user of this Website, you agree to not abuse the Website in anyway...</p>

            <h2 className="text-lg font-semibold mt-6 mb-2">9. Amendment</h2>
            <p className="mb-4">These Terms and Conditions are subject to change and can be modified at any time without notice...</p>

            <h2 className="text-lg font-semibold mt-6 mb-2">10. Legal Disclaimer</h2>
            <p className="mb-4">We reserve the right to disclose your personal identifiable information when we believe that disclosure is necessary...</p>

            <h2 className="text-lg font-semibold mt-6 mb-2">11. Governing Law and Dispute Resolution</h2>
            <p className="mb-4">By accessing the Website, you agree and understand that these Terms and Conditions shall be governed by and construed in accordance with the laws of the Dubai International Financial Centre (“DIFC”)...</p>

            <h2 className="text-lg font-semibold mt-6 mb-2">12. Waiver</h2>
            <p className="mb-4">No term, condition, right obligation or breach of these Terms and Conditions shall be waived...</p>

            <h2 className="text-lg font-semibold mt-6 mb-2">13. Illegality</h2>
            <p className="mb-4">If any provision of these Website Terms and Conditions are held to be illegal or unenforceable...</p>

            <h2 className="text-lg font-semibold mt-6 mb-2">14. Language</h2>
            <p className="mb-4">These Website Terms and Conditions are published in English and Arabic...</p>

            <h2 className="text-lg font-semibold mt-6 mb-2">15. Contact Information</h2>
            <p className="mb-4">Questions about these Terms and Conditions should be sent to us at <a href="mailto:info@microlightsgroup.ae" className="text-blue-600 underline">info@microlightsgroup.ae</a>.</p>
          </div>

        </div>

      </motion.div>
    </motion.section>
  )
}
