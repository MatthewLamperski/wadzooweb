import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Text, useTheme } from "native-base";
import { FaShieldAlt } from "react-icons/all";
import "./PrivacyPolicy.css";

const PrivacyPolicy = ({ setNavbarTransparent }) => {
  const [navbarHeight, setnavbarHeight] = useState();
  useEffect(() => {
    setNavbarTransparent(false);
    setnavbarHeight(
      document.getElementsByClassName("navbar").item(0).clientHeight
    );
  }, []);
  const theme = useTheme();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        paddingTop: navbarHeight,
      }}
    >
      <Container className="py-4 d-flex flex-column">
        <div className="d-flex flex-row justify-content-start align-items-center">
          <FaShieldAlt size={28} color={theme.colors.secondary["800"]} />
          <Text
            my={0}
            px={3}
            color="secondary.800"
            fontWeight={300}
            fontSize={28}
          >
            Privacy Policy
          </Text>
        </div>
        <Text fontWeight={300} py={3} color="muted.400">
          LAST MODIFIED: APRIL 12, 2022
        </Text>
        <hr />
        <h4>I. Introduction</h4>
        <ol className="pt-2 upper-alpha">
          <li>
            WADZOO, LLC (the “Company” or “We”) respects your privacy and is
            committed to protecting it through our compliance with this Privacy
            Policy (the “Privacy Policy”, as may be referred to in other Company
            documentation, including the Terms of Use). This policy describes
            the types of information we may collect from you or that you may
            provide when you:
            <ol className="lower-roman">
              <li>
                Visit the website <a href="/">www.wadzoo.com</a> and all
                subdomains related thereto (our “Website”), and
              </li>
              <li>
                Download, install, and register on our Wadzoo application
                (“Wadzoo”), and our practices for collecting, using,
                maintaining, protecting, and disclosing that information.
              </li>
            </ol>
          </li>
          <li>This policy applies to information we collect:</li>
          <ol className="lower-roman">
            <li>On this Website or through Wadzoo;</li>
            <li>
              In email, text, and other electronic messages between you and this
              Website or Wadzoo; or
            </li>
            <li>
              When you interact with our advertising and applications on
              third-party websites and services if those applications or
              advertising include links to this Privacy Policy.
            </li>
          </ol>
          <li>It does not apply to information:</li>
          <ol className="lower-roman">
            <li>
              Collected by us offline or through any other means, including on
              any other website operated by the Company or any third party; or
            </li>
            <li>
              Any third party, including through any application or content
              (including advertising) that may link to or be accessible from or
              on the Website or Wadzoo,
            </li>
          </ol>
        </ol>
        <h4>II. Persons Under the Age of 18</h4>
        <ul className="upper-alpha pt-2">
          <li>
            Neither our Website nor Wadzoo is intended for persons under 18
            years of age. No one under the age of 18 may provide any personal
            information to or on the Website or Wadzoo. We do not knowingly
            collect personal information from children under 18. If you are
            under 18, you may not use or register on the Website or Wadzoo, make
            any purchases through the Website or Wadzoo, use any of the
            interactive features of this Website or Wadzoo or provide any
            information about yourself to us, including your name, address,
            telephone number, email address, or any screen name or username you
            may use. If we learn we have collected or received personal
            information from a person under 18, we will delete that information.
            If you believe (a) we might have any information from or about a
            minor (under the age of 18, for these purposes), or (b) a user’s
            activities are inappropriate, please flag the offending user’s
            profile within Wadzoo, and email any additional supporting
            information you have to{" "}
            <a href="mailto:support@wadzoo.com">support@wadzoo.com</a>.
          </li>
        </ul>
        <h4>III. Information We Collect About You; How We Collect It.</h4>
        <ol className="upper-alpha pt-2">
          <li>
            We collect several types of information from and about users of our
            Website and Wadzoo, including information:
            <ol className="lower-roman">
              <li>
                Provided by you; to register as a user with Wadzoo, you will be
                asked to either use your email and create a password, or you
                will be asked for your Google credentials (email and password).
                In doing so, you authorize us to access certain Google account
                information, such as your email address and display name.
                Further, you will be asked to allow Wadzoo to collect your
                location information from your device when you download or use
                our Services, the Website, or Wadzoo, including identifying
                information, such as your name, email address, and telephone
                number, and, if you transact business with us, some financial
                information. If you chat with other Wadzoo users or our user
                support team using any of our Services, you provide us the
                content of written chat transcripts. We may share or disclose
                your non- private, aggregated or otherwise non-personal
                information with third parties for industry analysis and
                demographic profiling and to deliver targeted advertising about
                other products and services and for marketing purposes. You may
                opt out of receiving marketing messages by using the opt-out
                mechanisms and links provided in each email;
              </li>
              <li>
                That is about you but individually does not identify you; or
              </li>
              <li>
                About the equipment you use to access our Website or Wadzoo, and
                usage details.
              </li>
            </ol>
          </li>
          <li>
            We collect this information:
            <ol className="lower-roman">
              <li>Directly from you when you provide it to us;</li>
              <li>
                Automatically as you navigate through the site or app.
                Information collected automatically may include usage details
                and information collected through cookies and other tracking
                technologies;
              </li>
              <li>
                Automatically from your mobile device (including, without
                limitation, any mobile devices or tablets) when you use our
                Services, including your device type, operating system access
                time, geographic location while the application is actively
                running, and any referring website address. In addition, we use
                user IDs instead of cookies (described later), to recognize
                users on Wadzoo. We do this to store preferences and track usage
                of Wadzoo; advertising companies do this to track the number and
                performance of advertisements that may be more relevant to you.
              </li>
            </ol>
          </li>
          <li>
            Wadzoo may allow access to or make available opportunities for you
            to view certain content and receive other products, services or
            other materials provided by us or third parties based on your
            location. To make these opportunities available to you, Wadzoo will
            determine your location using one or more reference points, such as
            GPS, Bluetooth or software within your mobile device. If you have
            set your mobile device to disable GPS, Bluetooth or other location
            determining software, or do not authorize Wadzoo to access your
            location data, you will not be able to access such location-specific
            content, products, services and materials. In addition, Wadzoo will
            not function as intended by the Company.
          </li>
          <li>
            The information we collect on or through our Website or Wadzoo may
            include:
            <ol className="lower-roman">
              <li>
                Information that you provide by filling in forms on our Website
                or Wadzoo. This includes information provided at the time of
                registering for Wadzoo (as defined in the Terms of Use). We may
                also ask you for information when you report a problem with our
                Services;
              </li>
              <li>
                Records and copies of your correspondence (including email
                addresses) if you contact us; or
              </li>
              <li>
                As you navigate through and interact with our Services through
                the Website or Wadzoo, we may use automatic data-collection
                technologies to collect certain information about your
                equipment, browsing actions, and patterns, including details of
                your visits to Wadzoo and use of our Services, including
                location data and other communication data and the resources
                that you access and use in conjunction with our Services.
              </li>
            </ol>
          </li>
          <li>
            The information we collect automatically is statistical data, but we
            may maintain it or associate it with personal information we collect
            in other ways. This helps us to improve our Website and Wadzoo, and
            to deliver a better and more personalized service, including by
            enabling us to:
            <ol className="lower-roman">
              <li>Estimate our audience size and usage patterns;</li>
              <li>
                Store information about your preferences, allowing us to
                customize our Services according to your individual interests;
              </li>
              <li>
                Speed up your searches and overall application infrastructure;
                or
              </li>
              <li>
                Recognize you when you return to the Website and Wadzoo, or use
                our Services.
              </li>
            </ol>
          </li>
          <li>
            The technologies we use for this automatic data collection may
            include:
            <ol className="lower-roman">
              <li>
                User IDs. By registering with the Wadzoo through the Website or
                Wadzoo, you are assigned a random ID we use to keep track of
                your profile, your activity on the Website or Wadzoo, and for
                overall application functionality.
              </li>
            </ol>
          </li>
        </ol>
        <h4>IV. How We Use Your Information</h4>
        <ol className="upper-alpha pt-2">
          <li>
            We use information that we collect about you or that you provide to
            us, including any personal information:
            <ol className="lower-roman">
              <li>To present our Website, Wadzoo, and its contents to you;</li>
              <li>
                To provide you with information, products, or services that you
                request from us;
              </li>
              <li>To fulfill any other purpose for which you provide it;</li>
              <li>
                To provide you with notices about your Wadzoo account or
                subscription, including expiration and renewal notices;
              </li>
              <li>
                To carry out our obligations and enforce our rights arising from
                any contracts entered into between you and us, including for
                billing and collection purposes;
              </li>
              <li>
                To perform research and analysis about your use of, or interest
                in, our others’ products, services, or content;
              </li>
              <li>
                To communicate with you via email, telephone, postal mail, or
                mobile devices about products, venues, or services that may be
                of interest to you either from us or other third parties;
              </li>
              <li>
                To develop, display, and track content and advertising tailored
                to your interests on the Website or Wadzoo;
              </li>
              <li>To provide or analyze Website or Wadzoo analytics.</li>
              <li>
                To notify you about changes to our Website, Wadzoo, or any
                products or services we offer or provide through them;
              </li>
              <li>
                In any other way we may describe when you we may describe when
                you provide the information;
              </li>
              <li>
                In any other way we may describe when you provide the
                information;
              </li>
              <li>For any other purpose with your consent.</li>
            </ol>
          </li>
          <li>
            In all circumstances listed in (A) above, we may perform these
            functions directly or use a third-party vendor to perform these
            functions on our behalf who will be authorized to use your personal
            information only to perform services for us. Please note that this
            Privacy Policy does not create rights enforceable by third parties
            or require disclosure of any personal information relating to users
            of the Website or Wadzoo.
          </li>
          <li>
            If you contact our support team through the Website or Wadzoo, we
            will receive your email address along with the information you send
            us to help resolve your query. We will keep records of our
            communications with you, including any complaints or reports that we
            receive from you about other users (and from other users about you).
            We will not provide you information about users who report you.
          </li>
        </ol>
        <h4>V. Disclosure of Your Information.</h4>
        <ol className="upper-alpha pt-2">
          <li>
            We may disclose aggregated information about our users, and
            information that does not identify any individual without
            restriction. We may disclose personal information that we collect or
            you provide as described in this Privacy Policy:
            <ol className="lower-roman">
              <li>To our subsidiaries and affiliates;</li>
              <li>
                To contractors, service providers, and other third parties we
                use to support our business and who are bound by contractual
                obligations to keep personal information confidential and use it
                only for the purposes for which we disclose it to them;
              </li>
              <li>
                To a buyer or other successor in the event of a merger,
                divestiture, restructuring, reorganization, dissolution, or
                other sale or transfer of some or all of the Company’s assets,
                whether as a going concern or as part of bankruptcy,
                liquidation, or similar proceeding, in which personal
                information held by the Company about Wadzoo or Website users is
                among the assets transferred;
              </li>
              <li>To fulfill the purpose for which you provide it;</li>
              <li>
                For any other purpose disclosed by us when you provide the
                information; or
              </li>
              <li>With your consent.</li>
            </ol>
          </li>
          <li>
            We may also disclose your personal information:
            <ol className="lower-roman">
              <li>
                To comply with any court order, law, or legal process, including
                to respond to any government or regulatory request;
              </li>
              <li>
                To enforce or apply our Terms of Use and other agreements; or
              </li>
              <li>
                If we believe disclosure is necessary or appropriate to protect
                the rights, property, or safety of the Company, Wadzoo users, or
                others.
              </li>
            </ol>
          </li>
        </ol>
        <h4>VI. Reporting Other Users.</h4>
        <ul>
          <li>
            You, as a registered user having a Wadzoo account, may report other
            users for inappropriate activity or activity that breaches the Terms
            of Use. To report another user, you may (a) Use the report function
            within Wadzoo, accessible from the offending user’s profile, or (b)
            Email the address provided below in this Privacy Policy. Upon the
            Company’s sole review and determination, the offending user will be
            monitored for inappropriate activity or for violation of our
            policies. Reporting a user does not block the offending user from
            seeing any information you post to your profile.
          </li>
        </ul>
        <h4>VII. Termination of Your Account</h4>
        <ol className="upper-alpha">
          <li>
            When your Account is terminated, for any or no reason as may be
            determined by the Terms of Use, we take reasonable efforts to make
            sure it is no longer viewable on Wadzoo. Your account is immediately
            deleted from our systems. We are not responsible for any
            information, pictures, comments, or other content that is deleted
            from our systems resulting from the termination of your account.
          </li>
          <li>
            To prevent abuse of the Website or Wadzoo by a user following
            termination or deletion of an account, we shall retain such
            information as we deem in our sole discretion may be necessary to
            ensure that the user does not open a new account or profile in
            violation of our Terms of Use or other restrictions, and to ensure
            compliance with all laws and regulations.
          </li>
          <li>
            After you remove information from your profile or delete your
            account, copies of that information may still be viewable or
            accessed to the extent that such information has been previously
            shared with others or copied or stored by other users or to the
            extent that such information has been shared with search engines. We
            cannot control this, nor do we accept any liability for this. If you
            have given third-party applications or websites access to your
            personal information, they may retain such information to the extent
            permitted subject to their respective terms of service or privacy
            policies.
          </li>
        </ol>
        <h4>VIII. Data Security.</h4>
        <ul>
          <li>
            We have implemented measures designed to secure your personal
            information from accidental loss and from unauthorized access, use,
            alteration, and disclosure. The safety and security of your
            information also depends on you. Where you have access to certain
            parts of our Website, or Wadzoo, you are responsible for keeping
            your password confidential. We ask you not to share your password
            with anyone. Unfortunately, the transmission of information via the
            internet is not completely secure. Although we do our best to
            protect your personal information, we cannot guarantee the security
            of your personal information transmitted via our Website or Wadzoo.
            Any transmission of personal information is at your own risk. We are
            not responsible for circumvention of any privacy settings or
            security measures contained on the Website or Wadzoo.
          </li>
        </ul>
        <h4>IX. Communicating with You.</h4>
        <ul>
          <li>
            We may provide you with emails, text messages, push notifications,
            alerts, and other messages related to the Website or Wadzoo, such as
            enhancements, offers, products, events, and other promotions. After
            downloading Wadzoo, you will be asked to accept or deny push
            notifications/alerts. If you deny, you will not receive any push
            notifications/alerts. If you accept, push notifications/alerts will
            be automatically sent to you. If you no longer wish to receive push
            notifications/alerts from Wadzoo, you may opt out by changing your
            notification settings on your mobile device. With respect to other
            types of messaging or communications, such as emails, text messages,
            etc., you can unsubscribe or opt out by either following the
            specific instructions included in such communications, or by
            emailing us with your request at{" "}
            <a href="mailto:support@wadzoo.com">support@wadzoo.com</a>.
          </li>
        </ul>
        <h4>X. Changes to Our Privacy Policy.</h4>
        <ul>
          <li>
            It is our policy to post any changes we make to our Privacy Policy
            to this subdomain page. If we make material changes to how we treat
            our users’ personal information, we will notify you by email to the
            email address specified in your account or through a notice on the
            Website or Wadzoo. The date this Privacy Policy was last revised is
            identified at the top of the document. You are responsible for
            ensuring we have an up-to-date, active, and deliverable email
            address for you, and for periodically visiting the Website or Wadzoo
            and this Privacy Policy to check for any changes.
          </li>
        </ul>
        <h4>XI. Contact Information.</h4>
        <ul>
          <li>
            To ask questions or comment about this Privacy Policy and our
            privacy practices, contact us at{" "}
            <a href="mailto:support@wadzoo.com">support@wadzoo.com</a>.
          </li>
        </ul>
      </Container>
    </div>
  );
};

export default PrivacyPolicy;
