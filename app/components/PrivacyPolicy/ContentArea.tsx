"use client"
import React from 'react'
import { motion } from "framer-motion";
import { staggerContainer, moveUp } from '../scrollanims';
export default function ContentArea() {
  return (
    <motion.section variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="pt-10 lg:pt-[120px]">
      <motion.div variants={moveUp} className="container">
        <div className="pt-16 pb-12 lg:pb-20 border-b border-black text-black">
          <h1 className="text-2xl mb-6 md:mb-8 leading-[1.3]"> Microlights Lighting LLC – Website Privacy and Cookie Policy</h1>
          <p className="mb-6">Microlights Lighting LLC is committed to ensuring that your privacy is protected.</p>
          <p className="mb-8">This privacy and cookie policy sets out how we collect, use, process and protect the information that we collect from you or you provide to us when you use our website.</p>
          <h2 className="text-lg font-semibold mt-8 mb-4">1. What we collect</h2>
          <p className="mb-4">We may collect the following information from you:</p>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>Information that you voluntarily provide to us by completing the contact form on the website, which may include:</li>
            <ul className="list-disc pl-6 space-y-1">
              <li>Your name</li>
              <li>Your contact information including telephone number and email address</li>
              <li>A copy of your message and information request, or other information relevant to your query or information request</li>
            </ul>
            <li>Details of your visits to our website and the pages you access</li>
            <li>Your IP address, operating system, browser type</li>
            <li>See also, section 4 “How we use Cookies”</li>
          </ul>

          <h2 className="text-lg font-semibold mt-8 mb-4">2. What we do with the information we gather</h2>
          <p className="mb-4">We require this information to understand your needs and provide you with better information, and in particular for the following reasons:</p>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>Sending you news updates</li>
            <li>To improve our products and services</li>
            <li>For marketing and promotional purposes</li>
            <li>For administration and training purposes</li>
            <li>To invite you to complete a survey</li>
            <li>To identify demographic information about our website users (but not to identify individuals)</li>
            <li>See also, section 4 “How we use Cookies”</li>
          </ul>
          <p className="mb-4">As we do not offer goods or services for sale via the Website, the information we collect is minimal.</p>

          <h2 className="text-lg font-semibold mt-8 mb-4">3. Security</h2>
          <p className="mb-4">We are committed to ensuring that your information is secure. In order to prevent unauthorised access or disclosure we have put in place suitable physical, electronic and managerial procedures to safeguard and secure the information we collect online.</p>

          <h2 className="text-lg font-semibold mt-8 mb-4">4. How we use cookies</h2>
          <p className="mb-4">A cookie is a small file which asks permission to be placed on your computer&apos;s hard drive that is used for tracking analytics, or for personalisation purposes. Please note that the Microlights Website does not use cookies although Google Analytics will be integrated into the Website which will collect anonymized usage data such as page visits, device type (i.e. mobile or PC) and general location. This data will be typically stored on the Analytics provider’s platform, but will not be stored on the Website’s own servers.</p>
          <p className="mb-4">This information will help us in the operation of our website, and will help us improve our website and analyse data about web page traffic and improve our website in order to tailor it to customer needs. We only use this information for statistical analysis purposes and then the data is removed from the system.</p>

          <h2 className="text-lg font-semibold mt-8 mb-4">5. Links to third party websites</h2>
          <p className="mb-4">As mentioned in the Terms and Conditions, our website may contain links to other websites of interest. However, once you have used these links to leave our site, you should note that we do not have any control over that other website, and different terms and conditions and privacy policies may apply. Therefore, we cannot be responsible for the protection and privacy of any information which you provide whilst visiting such sites and such sites are not governed by this privacy statement. You should exercise caution and review the privacy statement applicable to the website in question.</p>

          <h2 className="text-lg font-semibold mt-8 mb-4">6. Controlling your personal information</h2>
          <p className="mb-4">We may disclose your personal information to our affiliates. However, we will not sell, distribute or provide your personal information to any other third parties unless we have your permission or under the following circumstances:</p>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>As required to our advisors, agents, consultants, or contractors, as necessary for the performance of services to us</li>
            <li>As required by law</li>
            <li>If we sell or purchase a business or assets, to the prospective buyer or seller</li>
            <li>If our assets are acquired by a third party</li>
          </ul>
          <p className="mb-4">If you believe that any information we are holding on you is incorrect or incomplete, we will promptly correct any information found to be incorrect.</p>
          <p className="">We may change this policy from time to time by changing this page. Please ensure that you check this page from time to time for updates.</p>
        </div>

      </motion.div>
    </motion.section>
  )
}
