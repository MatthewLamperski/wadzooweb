import React, { useEffect, useState } from "react";
import { Text, useTheme } from "native-base";
import { Container } from "react-bootstrap";
import { FaBook } from "react-icons/all";

const TermsOfUse = ({ setNavbarTransparent }) => {
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
          <FaBook size={28} color={theme.colors.secondary["800"]} />
          <Text
            my={0}
            px={3}
            color="secondary.800"
            fontWeight={300}
            fontSize={28}
          >
            Terms of Use
          </Text>
        </div>
        <Text fontWeight={300} py={3} color="muted.400">
          LAST MODIFIED: APRIL 12, 2022
        </Text>
        <hr />
        <div className="WordSection1">
          <p className="MsoNormal">
            <b>
              <span style={{ fontFamily: "Avenir", color: "#333333" }}>
                I. &nbsp; &nbsp;Acceptance of the Terms of Use.
              </span>
            </b>
          </p>
          <p
            className="MsoListParagraph"
            style={{ marginLeft: "43.0pt", textIndent: "-25.0pt" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (A)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              These terms of use are entered into by and between You and WADZOO
              LLC (the&nbsp;<b>“Company</b>”, “<b>we</b>” or “<b>us</b>”). The
              following terms of use, together with the Privacy Policy, the
              Wadzoo Guidelines, any terms disclosed and agreed to by you if you
              purchase additional features, products or services we offer on the
              Wadzoo mobile application (“<b>Wadzoo</b>”) or&nbsp;
            </span>
            <u>
              <a href="http://www.wadzoo.com">
                <span style={{ fontFamily: "Avenir" }}>www.wadzoo.com</span>
              </a>
            </u>
            <span
              style={{
                fontFamily: "Avenir",
                color: "#333333",
              }}
            >
              &nbsp;(the “<b>Website</b>”) (together, the “<b>Services</b>”),
              and any documents they expressly incorporate by reference
              (collectively, these “<b>Terms of Use</b>”), govern your access to
              and use of Wadzoo and&nbsp;
            </span>
            <a href="http://www.wadzoo.com">
              <span style={{ fontFamily: "Avenir" }}>www.wadzoo.com</span>
            </a>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              , including any content, functionality and services offered on or
              through the Services, and only once you have created a Wadzoo
              account.
            </span>
          </p>
          <p
            className="MsoListParagraph"
            style={{ marginLeft: "43.0pt", textIndent: "-25.0pt" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (B)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              Please read these Terms of Use carefully before you start to use
              the Services.&nbsp;
              <b>
                By using the Services, or by clicking to accept or agree to the
                Terms of Use when this option is made available to you, you
                accept and agree to be bound and abide by these Terms of Use and
                our Privacy Policy, found at&nbsp;
              </b>
            </span>
            <a href="http://www.wadzoo.com/privacypolicy">
              <b>
                <span style={{ fontFamily: "Avenir" }}>
                  www.wadzoo.com/privacypolicy
                </span>
              </b>
            </a>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              {" "}
              <b>incorporated herein by reference.</b>&nbsp;If you do not agree
              to these Terms of Use or the Privacy Policy, you must not access
              or use Wadzoo or the Website.&nbsp;
            </span>
          </p>
          <p
            className="MsoListParagraph"
            style={{ marginLeft: "43.0pt", textIndent: "-25.0pt" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (C)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              The Services are offered and available to users who are 18 years
              of age or older and reside in the United States or any of its
              territories or possessions. By using this Website or Wadzoo, you
              represent and warrant that you are of legal age to form a binding
              contract with the Company and meet all the foregoing eligibility
              requirements. If you do not meet these requirements, you must not
              access or use the Services.
            </span>
          </p>
          <p
            className="MsoListParagraphCxSpFirst"
            style={{ marginLeft: "43.0pt", textIndent: "-25.0pt" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (D)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              YOU ARE SOLELY RESPONSIBLE FOR YOUR INTERACTIONS WITH OTHER USERS,
              INCLUDING THOSE ARISING OUT OF YOUR USE OF THE WEBSITE OR WADZOO.
              THE COMPANY DOES NOT CONDUCT CRIMINAL BACKGROUND CHECKS ON ITS
              USERS. THE COMPANY DOES NOT WARRANT ANY OR ALL INFORMATION
              PRESENTED ON THE WEBSITE OR WADZOO, NOR ANY CONDUCT OF ANY OF ITS
              PAST, CURRENT, OR FUTURE USERS. IF THE COMPANY DETERMINES, IN ITS
              SOLE DISCRETION, TO CONDUCT A CRIMINAL BACKGROUND CHECK OR OTHER
              SCREENINGS (SUCH AS SEX OFFENDER REGISTER SEARCHES), THE COMPANY
              MAY USE AVAILABLE PUBLIC RECORDS.
            </span>
          </p>
          <p
            className="MsoListParagraphCxSpLast"
            style={{ marginLeft: "43.0pt" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              &nbsp;
            </span>
          </p>
          <p className="MsoNormal">
            <b>
              <span style={{ fontFamily: "Avenir", color: "#333333" }}>
                II. &nbsp; &nbsp;Changes to the Terms of Use.
              </span>
            </b>
          </p>
          <p
            className="MsoListParagraphCxSpFirst"
            style={{ marginLeft: "52.0pt", textIndent: "-25.0pt" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (A)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              We may revise and update these Terms of Use from time to time in
              our sole discretion. All changes are effective immediately when we
              post them and apply to all access to and use of the Services. Your
              continued use of the Website or Wadzoo following the posting of
              revised Terms of Use means that you accept and agree to the
              changes. You are expected to check this page from time to time so
              you are aware of any changes, as they are binding on you.
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{ marginLeft: "52.0pt", textIndent: "-25.0pt" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (B)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              The Company may provide you with notices, including those
              regarding changes to these Terms of Use, using any reasonable
              means, which may include email, SMS, MMS, text message or postings
              on the Website or Wadzoo. Such notices may not be received if you
              violate these Terms of Use by accessing the Services, Website, or
              Wadzoo in an unauthorized manner. You agree that you are deemed to
              have received all notice that would have been delivered had you
              accessed the Website or Wadzoo in an authorized manner.
            </span>
          </p>
          <p
            className="MsoListParagraphCxSpLast"
            style={{ marginLeft: "52.0pt", textIndent: "-25.0pt" }}
          >
            <span
              style={{
                fontSize: "11.0pt",
                fontFamily: '"Arial",sans-serif',
                color: "white",
              }}
            >
              (C)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;{" "}
              </span>
            </span>
          </p>
          <p className="MsoNormal">
            <b>
              <span style={{ fontFamily: "Avenir", color: "#333333" }}>
                III. &nbsp; &nbsp;Accessing the Services and Account Security.
              </span>
            </b>
          </p>
          <p
            className="MsoListParagraphCxSpFirst"
            style={{ marginLeft: "43.0pt", textIndent: "-25.0pt" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (A)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              We reserve the right to withdraw or amend the Website or Wadzoo,
              and any of the Services provided on the Website or Wadzoo.
              Further, we reserve the right to revise, update, modify, and close
              down the Wadzoo application, and any of the Services provided
              therein. We will not be liable if for any reason all or any part
              of the Website or Wadzoo or Services are unavailable at any time
              or for any period. From time to time, we may restrict access to
              some parts of the Website or Wadzoo, restrict access to some part
              of the Services, or the entire Website or Wadzoo, to users,
              including registered users.
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{ marginLeft: "43.0pt", textIndent: "-25.0pt" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (B)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              You are solely responsible for:
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{ marginLeft: "79.0pt", textIndent: "-.5in" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (i)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              Making all arrangements necessary for you to have access to the
              Website or Wadzoo, and
            </span>
          </p>
          <p
            className="MsoListParagraphCxSpMiddle"
            style={{ marginLeft: "79.0pt", textIndent: "-.5in" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (ii)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              Ensuring that all persons who access the Website or Wadzoo or
              Services through your Internet connection are aware of these Terms
              of Use and comply with them. A list of minimum system
              requirements, including operating system and physical hardware
              requirements, may be found on the Website or Wadzoo.
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{ marginLeft: "43.0pt", textIndent: "-25.0pt" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (C)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              To access the Website or Wadzoo or Services, you must create a
              Wadzoo account. A Wadzoo account can be created with an email and
              password or signing in with Google. It is a condition of your use
              of the Website or Wadzoo that all the information you provide on
              the Website or Wadzoo is correct, current, and complete. You agree
              that all information you provide to register with this Website or
              Wadzoo or otherwise, including but not limited to using any
              interactive features on the Website or Wadzoo, is governed by our
              Privacy Policy at&nbsp;
            </span>
            <a href="http://www.wadzoo.com/privacypolicy">
              <span style={{ fontFamily: "Avenir" }}>
                www.wadzoo.com/privacypolicy
              </span>
            </a>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              , and you consent to all actions we take with respect to your
              information consistent with our Privacy Policy.
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpFirst"
            style={{ marginLeft: "43.0pt", textIndent: "-25.0pt" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (D)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              When you sign in through your Google credentials, or any other
              piece of information as part of our security procedures, you must
              (and hereby agree to) treat such information as confidential, and
              you must not disclose it to any other person or entity. You also
              acknowledge that your Wadzoo account is personal to you and agree
              not to provide any other person with access to this Website,
              Wadzoo, or portions of either using your username, password, or
              other security information, including your Google credentials. You
              agree to notify us immediately of any unauthorized access to or
              use of your username or password or any other breach of security.
              You should use caution when accessing your account from a public
              or shared computer, mobile device (including, without limitation,
              any mobile phones or tablets) so that others are not able to view
              or record your password or other personal information.
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{ marginLeft: "43.0pt", textIndent: "-25.0pt" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (E)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              We have the right to disable any username, password, or other
              identifier, whether chosen by you or provided by us, at any time
              in our sole discretion for any or no reason, including if, in our
              opinion, you have violated any provision of these Terms of
              Use.&nbsp;
            </span>
          </p>
          <p
            className="MsoListParagraphCxSpLast"
            style={{ marginLeft: "52.0pt", textIndent: "-25.0pt" }}
          >
            <span
              style={{
                fontSize: "11.0pt",
                fontFamily: '"Arial",sans-serif',
                color: "white",
              }}
            >
              (D)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;{" "}
              </span>
            </span>
          </p>
          <p className="MsoNormal">
            <b>
              <span style={{ fontFamily: "Avenir", color: "#333333" }}>
                IV. &nbsp; &nbsp;Intellectual Property Rights.
              </span>
            </b>
          </p>
          <p
            className="MsoListParagraphCxSpFirst"
            style={{ marginLeft: "43.0pt", textIndent: "-25.0pt" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (A)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              The Website, Wadzoo, and its entire contents, features, and
              functionality (including, but not limited to, all information,
              software, text, displays, featured images, video and audio, and
              the design, selection, and arrangement of the above) are owned by
              the Company or its licensors, and are protected by United States
              and international copyright, trademark, patent, trade secret and
              other intellectual property or proprietary rights laws.
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{ marginLeft: "43.0pt", textIndent: "-25.0pt" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (B)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              These Terms of Use permit you to use the Website or Wadzoo for
              your personal, non-commercial use only. You must not reproduce,
              distribute, modify, create derivative works of, publicly display,
              publicly perform, download, store or transmit any of the material
              on our Website or Wadzoo, except as follows:
            </span>
          </p>
          <p
            className="MsoListParagraphCxSpMiddle"
            style={{ marginLeft: "66.0pt", textIndent: "-.5in" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (i)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              Your computer or mobile device may temporarily store copies of
              such materials in RAM incidental to your accessing and viewing
              those materials on either of your computer or mobile device,
              respectively.
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{ marginLeft: "66.0pt", textIndent: "-.5in" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (ii)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              You may store files that are automatically cached by your Web
              browser for display enhancement purposes.
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{ marginLeft: "66.0pt", textIndent: "-.5in" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (iii)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              You may download a single copy of our Wadzoo application to your
              computer or mobile device solely for your own personal,
              non-commercial use, provided you agree to be bound by our end user
              license agreement for such applications.
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpFirst"
            style={{ marginLeft: "66.0pt", textIndent: "-.5in" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (iv)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              You may not authorize any organizations, companies, or businesses
              to use the Services for any purpose.
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpLast"
            style={{ marginLeft: "66.0pt", textIndent: "-.5in" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (v)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              When we provide social media features with certain content, you
              may take such actions as are enabled by such features.
            </span>
          </p>
          <p className="MsoNormal" style={{ marginLeft: "30.0pt" }}></p>
          <p
            className="MsoListParagraph"
            style={{ marginLeft: "43.0pt", textIndent: "-25.0pt" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (C)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              You must not:
            </span>
          </p>
          <p
            className="MsoListParagraphCxSpFirst"
            style={{ marginLeft: "66.0pt", textIndent: "-.5in" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (i)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              Modify copies of any materials from the Website or Wadzoo;
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{ marginLeft: "66.0pt", textIndent: "-.5in" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (ii)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              Delete or alter any copyright, trademark, or other proprietary
              rights notices from copies of materials from the Website or
              Wadzoo; or
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpLast"
            style={{ marginLeft: "66.0pt", textIndent: "-.5in" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (iii)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              Permit access or use for any commercial purposes any part of the
              Website or Wadzoo, or any services or materials available through
              the Website or Wadzoo.
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpFirst"
            style={{ marginLeft: "43.0pt", textIndent: "-25.0pt" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (D)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              If you wish to make any use of material on the Website or Wadzoo
              other than that set out in this Section, please address your
              request to:&nbsp;
            </span>
            <a href="mailto:support@wadzoo.com" target="_blank">
              <span style={{ fontFamily: "Avenir" }}>support@wadzoo.com</span>
            </a>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>.</span>
          </p>

          <p
            className="MsoListParagraphCxSpLast"
            style={{ marginLeft: "43.0pt", textIndent: "-25.0pt" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (E)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              If you print, copy, modify, download, or otherwise use or provide
              any other person, organization, company, or business with access
              to any part of the Website or Wadzoo in breach of the Terms of
              Use, your right to use the Website or Wadzoo will cease
              immediately and you must, at our option, return or destroy any
              copies of the materials you have made. No right, title, or
              interest in or to the Website or Wadzoo or any content on the
              Website or Wadzoo is transferred to you, and all rights not
              expressly granted are reserved by the Company. Any use of the
              Website or Wadzoo not expressly permitted by these Terms of Use is
              a breach of these Terms of Use and may violate copyright,
              trademark, and other laws.
            </span>
          </p>
          <p className="MsoNormal">
            <b>
              <span style={{ fontFamily: "Avenir", color: "#333333" }}>
                V. &nbsp; &nbsp;Trademarks.
              </span>
            </b>
          </p>
          <p className="MsoNormal">
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              The Company name, the term Wadzoo, and all related names, logos,
              product and service names, designs and slogans are trademarks of
              the Company or its affiliates or licensors. You must not use such
              marks without the prior written permission of the Company. All
              other names, logos, product and service names, designs, and
              slogans on this Website or Wadzoo are the trademarks of their
              respective owners, where applicable.
            </span>
          </p>
          <p className="MsoNormal">
            <b>
              <span style={{ fontFamily: "Avenir", color: "#333333" }}>
                VI. &nbsp; &nbsp;Prohibited Uses.
              </span>
            </b>
          </p>
          <p
            className="MsoListParagraph"
            style={{ marginLeft: "43.0pt", textIndent: "-25.0pt" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (A)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              You may use the Website or Wadzoo only for lawful purposes and in
              accordance with these Terms of Use. You agree not to use the
              Website or Wadzoo:
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpFirst"
            style={{ marginLeft: "66.0pt", textIndent: "-.5in" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (i)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              In any way that violates any applicable federal, state, local or
              international law or regulation (including, without limitation,
              any laws regarding the export of data or software to and from the
              US or other countries);
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpLast"
            style={{ marginLeft: "66.0pt", textIndent: "-.5in" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (ii)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              To exploit, harm or attempt to exploit or harm minors in any way
              by exposing them to inappropriate content, asking for personally
              identifiable information or otherwise;
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpFirst"
            style={{ marginLeft: "66.0pt", textIndent: "-.5in" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (iii)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              To send, knowingly receive, upload, download, use or reuse any
              material which does not comply with the “Content Standards” set
              out in Section X in these Terms of Use;
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{ marginLeft: "66.0pt", textIndent: "-.5in" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (iv)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              To transmit or procure the sending of any advertising or
              promotional material, including any “junk mail”, “chain letter”,
              “spam” or any other similar solicitation;
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{ marginLeft: "66.0pt", textIndent: "-.5in" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (v)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              To impersonate or attempt to impersonate the Company, a Company
              employee, another user or any other person or entity (including,
              without limitation, by using email addresses or usernames
              associated with any of the foregoing); or
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpLast"
            style={{ marginLeft: "66.0pt", textIndent: "-.5in" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (vi)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              To engage in any other conduct that restricts or inhibits anyone’s
              use or enjoyment of the Website or Wadzoo, or which, as determined
              by us, may harm the Company or users of the Website or Wadzoo or
              expose them to liability.
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpFirst"
            style={{ marginLeft: "43.0pt", textIndent: "-25.0pt" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (B)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              Additionally, you agree not to:
            </span>
          </p>
          <p
            className="MsoListParagraphCxSpMiddle"
            style={{ marginLeft: "66.0pt", textIndent: "-.5in" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (i)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              Use the Website or Wadzoo in any manner that could disable,
              overburden, damage, or impair the site or interfere with any other
              party’s use of the Website or Wadzoo, including their ability to
              engage in real-time activities through the Website or Wadzoo;
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{ marginLeft: "66.0pt", textIndent: "-.5in" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (ii)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              Use any robot, spider or other automatic device, process, or means
              to access the Website or Wadzoo for any purpose, including
              monitoring or copying any of the material presented therein;
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{ marginLeft: "66.0pt", textIndent: "-.5in" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (iii)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              Use any manual process to monitor or copy any of the material on
              the Website or Wadzoo, or for any other unauthorized purpose
              without our prior written consent;
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{ marginLeft: "66.0pt", textIndent: "-.5in" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (iv)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              Use any device, software or routine that interferes with the
              proper working of and delivery of the Services;
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{ marginLeft: "66.0pt", textIndent: "-.5in" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (v)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              Introduce any viruses, trojan horses, worms, logic bombs or other
              material which is malicious or technologically harmful;
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpLast"
            style={{ marginLeft: "66.0pt", textIndent: "-.5in" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (vi)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              Attempt to gain unauthorized access to, interfere with, damage or
              disrupt any parts of the Website or Wadzoo, the server on which
              the Website or Wadzoo is stored, or any server, computer or
              database connected to the Services;&nbsp;
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpFirst"
            style={{ marginLeft: "66.0pt", textIndent: "-.5in" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (vii)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              Attack the Website or Wadzoo or service via a denial-of-service
              (DOS) attack or a distributed denial-of-service (DDOS) attack; or
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{ marginLeft: "66.0pt", textIndent: "-.5in" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (viii)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              Otherwise attempt to interfere with the proper working of the
              Website or Wadzoo.
            </span>
          </p>
          <p
            className="MsoListParagraphCxSpLast"
            style={{ marginLeft: "66.0pt" }}
          ></p>
          <p className="MsoNormal">
            <b>
              <span style={{ fontFamily: "Avenir", color: "#333333" }}>
                VII. &nbsp; &nbsp;User Uploads.
              </span>
            </b>
          </p>
          <p
            className="MsoListParagraphCxSpFirst"
            style={{ marginLeft: "43.0pt", textIndent: "-25.0pt" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (A)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              The Website or Wadzoo may contain message boards, chat rooms,
              personal web pages or profiles, and other interactive features
              (collectively, “<b>User Services</b>”) that allow users to post,
              submit, publish, display, or transmit to other users or other
              persons (hereinafter, “<b>post</b>”) content or materials
              (collectively, “<b>User Uploads</b>
              ”) on or through the Website or Wadzoo.
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{ marginLeft: "43.0pt", textIndent: "-25.0pt" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (B)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              All User Uploads must comply with the Content Standards set out in
              Section X in these Terms of Use. In addition, you must not use our
              name in metatags, keywords, or hidden text, except with our
              express written consent.
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{ marginLeft: "43.0pt", textIndent: "-25.0pt" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (C)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              Any User Upload you post to the site will be considered
              non-confidential and non-proprietary. By providing any User Upload
              on the Website or Wadzoo, you grant us and our licensees,
              successors and assignees a worldwide, transferable,
              sub-licensable, royalty-free right and license to host, store,
              use, copy, display, reproduce, adapt, edit, publish, modify, and
              distribute the User Upload. This license is for the limited
              purpose of operating, developing, providing, promoting, and
              improving the Services, Website, Wadzoo or any iterations.
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{ marginLeft: "43.0pt", textIndent: "-25.0pt" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (D)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              You represent and warrant that:&nbsp;
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{ marginLeft: "66.0pt", textIndent: "-.5in" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (i)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              You own or control all rights, including intellectual property
              rights, to the User Uploads and have the right to grant the
              license granted above to us and our licensees, successors and
              assignees;
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{ marginLeft: "66.0pt", textIndent: "-.5in" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (ii)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              All your User Uploads will comply with these Terms of Use; and
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{ marginLeft: "66.0pt", textIndent: "-.5in" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (iii)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              You understand and acknowledge that you are responsible for any
              User Uploads you submit or contribute, and you, not the Company,
              have full responsibility for such content, including its legality,
              reliability, accuracy, and appropriateness.
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{ marginLeft: "43.0pt", textIndent: "-25.0pt" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (E)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              We are not responsible, or liable to any third party, for the
              content or accuracy of any User Uploads posted by you or any other
              user of the Website or Wadzoo. Although we reserve the right to
              review and remove User Uploads that violate these Terms of Use,
              such User Uploads are the sole responsibility of the user who
              posts them, and we cannot guarantee that all content will comply
              with these Terms of Use. If you see a User Upload on the Services
              that violates these Terms of Use, please report it within the
              Services or via&nbsp;
            </span>
            <a href="mailto:support@wadzoo.com" target="_blank">
              <span style={{ fontFamily: "Avenir" }}>support@wadzoo.com</span>
            </a>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>.</span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{ marginLeft: "43.0pt", textIndent: "-25.0pt" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (F)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              You agree that any User Upload you place on the Website or Wadzoo
              may be viewed by other users and may be viewed by any person
              visiting or utilizing the Services, the Website, or Wadzoo. When
              you use the Website or Wadzoo, you should assume that anything you
              post or submit may be publicly viewable and accessible, both by
              users and non-users of the Website or Wadzoo. Before you post any
              User Uploads, be aware that this content may be searchable by
              search engines.
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{ marginLeft: "43.0pt", textIndent: "-25.0pt" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (G)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              In consideration for the Company allowing you to use the Services,
              you agree that we, our affiliates, and our third-party partners
              may place advertising on the Services. By submitting suggestions
              or feedback to us regarding our Services, you agree that we may
              use and share such feedback for any purpose without compensating
              you.
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{ marginLeft: "43.0pt", textIndent: "-25.0pt" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (H)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              You do not have any rights in relation to other users’ User
              Uploads, and you may only use other users’ personal information to
              the extent that your use of it matches the Services’ purpose of
              allowing people with similar interests to meet one another. You
              may not use other users’ information for commercial purposes, to
              spam, harass, or to make unlawful threats. We reserve the right to
              terminate our relationship with you if you misuse other users’
              information or User Uploads.
            </span>
          </p>
          <p
            className="MsoListParagraphCxSpLast"
            style={{ marginLeft: "43.0pt", textIndent: "-25.0pt" }}
          >
            <span
              style={{
                fontSize: "11.0pt",
                fontFamily: '"Arial",sans-serif',
                color: "white",
              }}
            >
              (I)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
          </p>
          <p className="MsoNormal">
            <b>
              <span style={{ fontFamily: "Avenir", color: "#333333" }}>
                VIII. &nbsp; &nbsp;Monitoring and Enforcement; Termination.
              </span>
            </b>
          </p>
          <p
            className="MsoListParagraphCxSpFirst"
            style={{ marginLeft: "43.0pt", textIndent: "-25.0pt" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (A)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              We have the right to:
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{ marginLeft: "66.0pt", textIndent: "-.5in" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (i)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              Remove or refuse to post any User Uploads for any or no reason in
              our sole discretion;
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{ marginLeft: "66.0pt", textIndent: "-.5in" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (ii)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              Take any action with respect to any User Upload that we deem
              necessary or appropriate in our sole discretion, including if we
              believe that such User Upload violates the Terms of Use, including
              the Content Standards (Section X), infringes any intellectual
              property right or other right of any person or entity, threatens
              the personal safety of users of the Website, Wadzoo, or the
              public, or could create liability for the Company;
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{ marginLeft: "66.0pt", textIndent: "-.5in" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (iii)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              Disclose your identity or other information about you to any third
              party who claims that material posted by you violates their
              rights, including their intellectual property rights or their
              right to privacy;
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{ marginLeft: "66.0pt", textIndent: "-.5in" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (iv)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              Take appropriate legal action, including without limitation,
              referral to law enforcement, for any illegal or unauthorized use
              of the Website or Wadzoo, including any stalking or harassment; or
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{ marginLeft: "66.0pt", textIndent: "-.5in" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (v)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              Terminate or suspend your access to all or part of the Website or
              Wadzoo for any or no reason, including without limitation, any
              violation of these Terms of Use.
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{ marginLeft: "43.0pt", textIndent: "-25.0pt" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (B)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              Without limiting the foregoing, we have the right to fully
              cooperate with any law enforcement authorities or court order
              requesting or directing us to disclose the identity or other
              information of anyone posting any materials on or through the
              Website or Wadzoo.&nbsp;
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{ marginLeft: "43.0pt", textIndent: "-25.0pt" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (C)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              YOU WAIVE AND HOLD HARMLESS THE COMPANY FROM ANY CLAIMS RESULTING
              FROM ANY ACTION TAKEN BY THE COMPANY DURING OR BECAUSE OF ITS
              INVESTIGATIONS AND FROM ANY ACTIONS TAKEN BECAUSE OF
              INVESTIGATIONS BY EITHER THE COMPANY OR LAW ENFORCEMENT
              AUTHORITIES.
            </span>
          </p>
          <p className="MsoListParagraphCxSpMiddle"></p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{ marginLeft: "43.0pt", textIndent: "-25.0pt" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (D)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              When communicating with our customer care representatives, you
              agree to be respectful and kind. If we feel that your behavior
              towards any of our customer care representatives or other
              personnel is at any time threatening or offensive, we reserve the
              right to immediately terminate your account.
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{ marginLeft: "43.0pt", textIndent: "-25.0pt" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (E)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              We do not undertake to review material before it is posted on the
              Website or Wadzoo and cannot ensure prompt removal of
              objectionable material after it has been posted. Accordingly, we
              assume no liability for any action or inaction regarding
              transmissions, communications or content provided by any user or
              third party. We have no liability or responsibility to anyone for
              performance or nonperformance of the activities described in this
              Section, subject to any applicable law.
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{ marginLeft: "43.0pt", textIndent: "-25.0pt" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (F)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              You may terminate your account at any time, for any reason, by
              following the instructions in “Settings” in Wadzoo, however you
              will need to manage your in-app purchases through your mobile
              device platform (e.g., iTunes, Google Play). We may terminate your
              account at any time without notice if we believe that you have
              violated these Terms of Use. Upon such termination, you will not
              be entitled to any refund for purchases.
            </span>
          </p>

          <p className="MsoNormal">
            <b>
              <span style={{ fontFamily: "Avenir", color: "#333333" }}>
                IX. &nbsp; &nbsp;In-App Purchases.
              </span>
            </b>
          </p>
          <p className="MsoNormal">
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              From time to time, we may offer products and services for purchase
              (“
              <b>In-App Purchases</b>”) through iTunes, Google Play or other
              application platforms authorized by us (each, a “
              <b>Software Store</b>
              ”). If you choose to make an In-App Purchase, you will be prompted
              to enter details for your account with your Software Store (your “
              <b>IAP Account</b>”), and your IAP Account will be charged for the
              In-App Purchase in accordance with the terms disclosed to you at
              the time of purchase as well as the general terms for In-App
              Purchases that apply to your IAP Account. Some Software Stores may
              charge you sales tax, depending on where you live. If you purchase
              an auto-recurring periodic subscription through an In-App
              Purchase, your IAP Account will be billed continuously for the
              subscription until you cancel. After your initial subscription
              commitment period, and again after any subsequent subscription
              period, your subscription will automatically continue for an
              additional equivalent period, at the price you agreed to when
              subscribing. If you do not wish your subscription to renew
              automatically, or if you want to change or terminate your
              subscription, you will need to log in to your IAP Account and
              follow instructions to cancel your subscription, even if you have
              otherwise deleted your account with us or the Wadzoo application
              from your device.
            </span>
          </p>
          <p className="MsoNormal">
            <b>
              <span style={{ fontFamily: "Avenir", color: "#333333" }}>
                X. &nbsp; &nbsp;Content Standards.
              </span>
            </b>
          </p>
          <p className="MsoNormal">
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              These content standards (“<b>Content Standards</b>”) apply to all
              User Uploads and use of User Services. User Uploads must in their
              entirety comply with all applicable federal, state, local and
              international laws, including intellectual property laws and
              regulations. Without limiting the foregoing, User Uploads must
              not:
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpFirst"
            style={{ marginLeft: "66.0pt", textIndent: "-.5in" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (i)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              Contain any material which is defamatory, obscene, indecent,
              abusive, offensive, harassing, violent, hateful, inflammatory or
              otherwise objectionable;
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{ marginLeft: "66.0pt", textIndent: "-.5in" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (ii)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              Promote sexually explicit or pornographic material, violence, or
              discrimination based on race, sex, religion, nationality,
              disability, sexual orientation or age;
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{ marginLeft: "66.0pt", textIndent: "-.5in" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (iii)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              Infringe any patent, trademark, trade secret, copyright or other
              intellectual property or other rights of any other person;
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{ marginLeft: "66.0pt", textIndent: "-.5in" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (iv)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              Violate the legal rights (including the rights of publicity and
              privacy) of others or contain any material that could give rise to
              any civil or criminal liability under applicable laws or
              regulations or that otherwise may conflict with these Terms of Use
              and our Privacy Policy;
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{ marginLeft: "66.0pt", textIndent: "-.5in" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (v)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              Be likely to deceive any person;
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{ marginLeft: "66.0pt", textIndent: "-.5in" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (vi)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              Promote any illegal activity, or advocate, promote or assist any
              unlawful act;
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{ marginLeft: "66.0pt", textIndent: "-.5in" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (vii)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              Cause annoyance, inconvenience or needless anxiety or be likely to
              upset, embarrass, alarm or annoy any other person;
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{ marginLeft: "66.0pt", textIndent: "-.5in" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (viii)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              Solicit passwords for any purpose, or personal identifying
              information for commercial or unlawful purposes from other users
              or disseminate another person’s personal information without his
              or her permission;
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{ marginLeft: "66.0pt", textIndent: "-.5in" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (ix)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              Impersonate any person, or misrepresent your identity or
              affiliation with any person or organization;
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{ marginLeft: "66.0pt", textIndent: "-.5in" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (x)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              Involve commercial activities or sales, such as contests,
              sweepstakes and other sales promotions, barter, or advertising; or
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{ marginLeft: "66.0pt", textIndent: "-.5in" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (xi)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              Give the impression that they emanate from or are endorsed by us
              or any other person or entity, if this is not the case;
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{ marginLeft: "66.0pt", textIndent: "-.5in" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (xii)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              Use another user’s account;
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{ marginLeft: "66.0pt", textIndent: "-.5in" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (xiii)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              Create another account if we have already terminated your account
              unless you have our permission.
            </span>
          </p>
          <p
            className="MsoListParagraphCxSpLast"
            style={{ marginLeft: "66.0pt" }}
          ></p>
          <p className="MsoNormal">
            <b>
              <span style={{ fontFamily: "Avenir", color: "#333333" }}>
                XI. &nbsp; &nbsp;Copyright Infringement.
              </span>
            </b>
          </p>
          <p className="MsoNormal">
            <b>
              <span style={{ fontFamily: "Avenir", color: "#333333" }}>
                We do not condone copyright infringement and will terminate the
                user accounts of repeat infringers.
              </span>
            </b>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              &nbsp;You may not post, distribute, or reproduce in any way any
              copyrighted materials, trademarks, or other proprietary
              information without obtaining the prior written consent of the
              owner of such proprietary rights. If you believe that your work
              has been copied or posted on the Website or Wadzoo in a way that
              constitutes copyright infringement, please provide our Copyright
              Agent (provided in this Section XI), in writing, with the
              information as follows:
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpFirst"
            style={{ marginLeft: "66.0pt", textIndent: "-.5in" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (i)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              An electronic or physical signature of the person authorized to
              act on behalf of the owner of the copyright or of interest in the
              copyright;
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{ marginLeft: "66.0pt", textIndent: "-.5in" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (ii)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              A description of the copyrighted work that you claim has been
              infringed;
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{ marginLeft: "66.0pt", textIndent: "-.5in" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (iii)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              A description of where the allegedly infringing material is
              located on the Website, Wadzoo, or in the provision of the
              Services, with reasonably sufficient detail to enable the Company
              to find the allegedly infringing material;
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{ marginLeft: "66.0pt", textIndent: "-.5in" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (iv)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              Your telephone number and email address;
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{ marginLeft: "66.0pt", textIndent: "-.5in" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (v)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              A written statement by you representing that you have a good faith
              belief that the disputed use is not authorized by the copyright
              owner, its agent, or the law; and
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{ marginLeft: "66.0pt", textIndent: "-.5in" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (vi)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              A written statement by you, made under penalty of perjury, that
              all the above information in your notice is accurate and that you
              are the copyright owner or authorized to act on the copyright
              owner’s behalf.
            </span>
          </p>
          <p
            className="MsoListParagraphCxSpLast"
            style={{ marginLeft: "66.0pt" }}
          ></p>
          <p className="MsoNormal">
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              Notice of claims of copyright infringement should be provided to
              the Company’s Copyright Agent at&nbsp;
            </span>
            <a href="mailto:support@wadzoo.com" target="_blank">
              <span style={{ fontFamily: "Avenir" }}>support@wadzoo.com</span>
            </a>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              , or at the following address:
            </span>
          </p>
          <p className="MsoNormal">
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              Copyright Agent
            </span>
          </p>
          <p className="MsoNormal">
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              c/o Wadzoo Legal
            </span>
          </p>
          <p className="MsoNormal">
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              2444 SAFFRON LANE
            </span>
          </p>
          <p className="MsoNormal">
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              The Villages, FL 32162
            </span>
          </p>
          <p className="MsoNormal">
            <b>
              <span style={{ fontFamily: "Avenir", color: "#333333" }}>
                XII. &nbsp; &nbsp;Reliance on Information Posted.
              </span>
            </b>
          </p>
          <p
            className="MsoListParagraphCxSpFirst"
            style={{ marginLeft: "45.0pt", textIndent: "-27.0pt" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (A)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              The information presented on or through the Website or Wadzoo is
              made available solely for general information purposes. We do not
              warrant the accuracy, completeness, or usefulness of this
              information. Any reliance you place on such information is
              strictly at your own risk. We disclaim all liability and
              responsibility arising from any reliance placed on such materials
              by you or any other visitor to the Website or Wadzoo, or by anyone
              who may be informed of any of its contents.
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{ marginLeft: "45.0pt", textIndent: "-27.0pt" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (B)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              This Website or Wadzoo may include content provided by third
              parties, including materials provided by other users, bloggers and
              third-party licensors, syndicators, aggregators or reporting
              services. All statements or opinions expressed in these materials,
              and all articles and responses to questions and other content,
              other than the content provided by the Company, are solely the
              opinions and the responsibility of the person or entity providing
              those materials. These materials do not necessarily reflect the
              opinion of the Company. We are not responsible, or liable to you
              or any third party, for the content or accuracy of any materials
              provided by any third parties.
            </span>
          </p>
          <p
            className="MsoListParagraphCxSpLast"
            style={{ marginLeft: "45.0pt" }}
          ></p>
          <p className="MsoNormal">
            <b>
              <span style={{ fontFamily: "Avenir", color: "#333333" }}>
                XIII. &nbsp; &nbsp;Changes to the Website or Wadzoo; Application
                Upgrades.
              </span>
            </b>
          </p>
          <p
            className="MsoListParagraphCxSpFirst"
            style={{ marginLeft: "43.0pt", textIndent: "-25.0pt" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (A)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              We may update the content on this Website or Wadzoo from time to
              time, but its content is not necessarily complete or up to date.
              Any of the material on the Website or Wadzoo may be out of date at
              any given time, and we are under no obligation to update such
              material.
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{ marginLeft: "43.0pt", textIndent: "-25.0pt" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (B)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              However, we may from time-to-time issue upgraded versions of the
              Website or Wadzoo application, wherein your downloaded mobile
              application may automatically electronically upgrade. You consent
              to such automatic upgrading on the Website or Wadzoo and on your
              mobile device and agree that these Terms of Use shall apply to all
              such upgrades.
            </span>
          </p>

          <p className="MsoNormal">
            <b>
              <span style={{ fontFamily: "Avenir", color: "#333333" }}>
                XIV. &nbsp; &nbsp;Information About You.
              </span>
            </b>
          </p>
          <p className="MsoNormal">
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              All information we collect on this Website or Wadzoo is subject to
              our Privacy Policy. By using the Website or Wadzoo, you consent to
              all actions taken by us with respect to your information in
              compliance with the Privacy Policy.&nbsp;
            </span>
          </p>
          <p className="MsoNormal">
            <b>
              <span style={{ fontFamily: "Avenir", color: "#333333" }}>
                XV. &nbsp; &nbsp;Linking to the Website or Wadzoo and Social
                Media Features.
              </span>
            </b>
          </p>
          <p
            className="MsoListParagraphCxSpFirst"
            style={{ marginLeft: "43.0pt", textIndent: "-25.0pt" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (A)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              You may link to our homepage, provided you do so in a way that is
              fair and legal and does not damage our reputation or take
              advantage of it, but you must not establish a link in such a way
              as to suggest any form of association, approval, or endorsement on
              our part.&nbsp;
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{ marginLeft: "43.0pt", textIndent: "-25.0pt" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (B)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              This Website or Wadzoo may provide certain social media features
              that enable you to:
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{ marginLeft: "66.0pt", textIndent: "-.5in" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (i)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              Link from your own or certain third-party websites to certain
              content on this Website or Wadzoo;
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{ marginLeft: "66.0pt", textIndent: "-.5in" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (ii)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              Send emails or other communications with certain content, or links
              to certain content, on this Website or Wadzoo; or
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{ marginLeft: "66.0pt", textIndent: "-.5in" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (iii)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              Cause limited portions of content on the Website or Wadzoo to be
              displayed or appear to be displayed on your own or certain
              third-party websites, software or mobile applications.
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpLast"
            style={{ marginLeft: "43.0pt", textIndent: "-25.0pt" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (C)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              You may use the above features solely as they are provided by us,
              and solely with respect to the content they are displayed with.
              Subject to the foregoing, you must not:
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpFirst"
            style={{ marginLeft: "66.0pt", textIndent: "-.5in" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (i)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              Establish a link from any part of the Website or Wadzoo that is
              not owned by you;
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{ marginLeft: "66.0pt", textIndent: "-.5in" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (ii)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              Cause the Website or Wadzoo or portions of it to be displayed, or
              appear to be displayed by, for example, framing, deep linking or
              in-line linking, on any other site;
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpLast"
            style={{ marginLeft: "66.0pt", textIndent: "-.5in" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (iii)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              Link to any part of the Website or Wadzoo other than the homepage;
              or
            </span>
          </p>
          <p
            className="MsoListParagraphCxSpFirst"
            style={{ marginLeft: "66.0pt", textIndent: "-.5in" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (iv)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              Otherwise take any action with respect to the materials on this
              Website or Wadzoo that is inconsistent with any other provision of
              these Terms of Use.
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{ marginLeft: "43.0pt", textIndent: "-25.0pt" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (D)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              You agree to cooperate with us in causing any unauthorized framing
              or linking immediately to cease. We reserve the right to withdraw
              linking permission without notice.
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{ marginLeft: "43.0pt", textIndent: "-25.0pt" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (E)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              We may disable all or any social media features and any links at
              any time without notice in our discretion.&nbsp;
            </span>
          </p>

          <p className="MsoNormal">
            <b>
              <span style={{ fontFamily: "Avenir", color: "#333333" }}>
                XVI. &nbsp; &nbsp;Links from the Website or Wadzoo.
              </span>
            </b>
          </p>
          <p className="MsoNormal">
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              If the Website or Wadzoo contains links to other sites and
              resources provided by third parties, these links are provided for
              your convenience only. This includes links contained in
              advertisements, including banner advertisements and sponsored
              links. We have no control over the contents of those sites or
              resources and accept no responsibility for them or for any loss or
              damage that may arise from your use of them. If you decide to
              access any of the third-party websites linked to this Website or
              Wadzoo, you do so entirely at your own risk and subject to the
              terms and conditions of use for such websites, where applicable.
            </span>
          </p>
          <p className="MsoNormal">
            <b>
              <span style={{ fontFamily: "Avenir", color: "#333333" }}>
                XVII. &nbsp; &nbsp;Geographic Restrictions.
              </span>
            </b>
          </p>
          <p className="MsoNormal">
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              The owner of the Website and WADZOO, LLC is based in the State of
              Florida in the United States. We provide this Website and Wadzoo
              for use only by persons located in the United States. We make no
              claims that the Website and Wadzoo or any of its content is
              accessible or appropriate outside of the United States. Access to
              the Website and Wadzoo may not be legal by certain persons or in
              certain countries. If you access the Website or Wadzoo from
              outside the United States, you do so on your own initiative and
              are responsible for compliance with local laws, including
              intellectual property laws.
            </span>
          </p>
          <p className="MsoNormal">
            <b>
              <span style={{ fontFamily: "Avenir", color: "#333333" }}>
                XVIII. &nbsp; &nbsp;Disclaimer of Warranties.
              </span>
            </b>
          </p>
          <p
            className="MsoListParagraphCxSpFirst"
            style={{ marginLeft: "43.0pt", textIndent: "-25.0pt" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (A)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              You understand that we cannot and do not guarantee or warrant that
              files available for downloading from the Internet, the Website, or
              Wadzoo, will be free of viruses or other destructive code. You are
              responsible for implementing sufficient procedures and checkpoints
              to satisfy your requirements for anti-virus protection and
              accuracy of data input and output, and for maintaining a means
              external to our site for any reconstruction of any lost
              data.&nbsp;
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{ marginLeft: "43.0pt", textIndent: "-25.0pt" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (B)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              WE WILL NOT BE LIABLE FOR ANY LOSS OR DAMAGE CAUSED BY A
              DISTRIBUTED DENIAL-OF-SERVICE ATTACK, VIRUS OR OTHER
              TECHNOLOGICALLY HARMFUL MATERIAL THAT MAY INFECT YOUR COMPUTER
              EQUIPMENT, MOBILE DEVICE, COMPUTER PROGRAMS, DATA OR OTHER
              PROPRIETARY MATERIAL DUE TO YOUR USE OF THE WEBSITE OR WADZOO OR
              ANY SERVICES OR ITEMS OBTAINED THROUGH THE WEBSITE OR WADZOO OR TO
              YOUR DOWNLOADING OF ANY MATERIAL POSTED ON IT, OR ON ANY WEBSITE
              LINKED TO IT.
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{ marginLeft: "43.0pt", textIndent: "-25.0pt" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (C)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              YOUR USE OF THE WEBSITE OR WADZOO, ITS CONTENT AND ANY SERVICES OR
              ITEMS OBTAINED THROUGH THE WEBSITE OR WADZOO IS AT YOUR OWN RISK.
              THE WEBSITE OR WADZOO, ITS CONTENT AND ANY SERVICES OR ITEMS
              OBTAINED THROUGH THE WEBSITE OR WADZOO ARE PROVIDED ON AN “AS IS”
              AND “AS AVAILABLE” BASIS, WITHOUT ANY WARRANTIES OF ANY KIND,
              EITHER EXPRESS OR IMPLIED. NEITHER THE COMPANY NOR ANY PERSON
              ASSOCIATED WITH THE COMPANY MAKES ANY WARRANTY OR REPRESENTATION
              WITH RESPECT TO THE COMPLETENESS, SECURITY, RELIABILITY, QUALITY,
              ACCURACY OR AVAILABILITY OF THE WEBSITE OR WADZOO. WITHOUT
              LIMITING THE FOREGOING, NEITHER THE COMPANY NOR ANYONE ASSOCIATED
              WITH THE COMPANY REPRESENTS OR WARRANTS THAT THE WEBSITE OR
              WADZOO, ITS CONTENT OR ANY SERVICES OR ITEMS OBTAINED THROUGH THE
              WEBSITE OR WADZOO WILL BE ACCURATE, RELIABLE, ERROR-FREE OR
              UNINTERRUPTED, THAT DEFECTS WILL BE CORRECTED, THAT OUR SITE OR
              THE SERVER THAT MAKES IT AVAILABLE ARE FREE OF VIRUSES OR OTHER
              HARMFUL COMPONENTS OR THAT THE WEBSITE OR WADZOO OR ANY SERVICES
              OR ITEMS OBTAINED THROUGH THE WEBSITE OR WADZOO WILL OTHERWISE
              MEET YOUR NEEDS OR EXPECTATIONS.&nbsp;
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{ marginLeft: "43.0pt", textIndent: "-25.0pt" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (D)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              THE COMPANY HEREBY DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER
              EXPRESS OR IMPLIED, STATUTORY OR OTHERWISE, INCLUDING BUT NOT
              LIMITED TO ANY WARRANTIES OF MERCHANTABILITY, NON-INFRINGEMENT AND
              FITNESS FOR PARTICULAR PURPOSE.
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{ marginLeft: "43.0pt", textIndent: "-25.0pt" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (E)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              THE FOREGOING DOES NOT AFFECT ANY WARRANTIES WHICH CANNOT BE
              EXCLUDED OR LIMITED UNDER APPLICABLE LAW.
            </span>
          </p>
          <p
            className="MsoListParagraphCxSpMiddle"
            style={{ marginLeft: "43.0pt", textIndent: "-25.0pt" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (F)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              YOU AGREE THAT YOUR USE OF WADZOO OR THE WEBSITE IS AT YOUR OWN
              RISK. YOU ARE SOLELY RESPONSIBLE FOR YOUR INTERACTIONS WITH OTHER
              MEMBERS. THE COMPANY IS NOT RESPONSIBLE FOR THE CONDUCT OF ANY
              USER.
            </span>
          </p>

          <p className="MsoNormal">
            <b>
              <span style={{ fontFamily: "Avenir", color: "#333333" }}>
                XIX. &nbsp; &nbsp;Limitation on Liability.
              </span>
            </b>
          </p>
          <p
            className="MsoListParagraphCxSpFirst"
            style={{ marginLeft: "43.0pt", textIndent: "-25.0pt" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (A)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              IN NO EVENT WILL THE COMPANY, ITS AFFILIATES OR THEIR LICENSORS,
              SERVICE PROVIDERS, EMPLOYEES, AGENTS, OFFICERS OR DIRECTORS BE
              LIABLE FOR DAMAGES OF ANY KIND, UNDER ANY LEGAL THEORY, ARISING
              OUT OF OR IN CONNECTION WITH YOUR USE, OR INABILITY TO USE, THE
              WEBSITE OR WADZOO, ANY WEBSITES LINKED TO IT, ANY CONTENT ON THE
              WEBSITE OR WADZOO OR SUCH OTHER WEBSITES OR ANY SERVICES OR ITEMS
              OBTAINED THROUGH THE WEBSITE OR WADZOO OR SUCH OTHER WEBSITES,
              INCLUDING ANY DIRECT, INDIRECT, SPECIAL, INCIDENTAL, CONSEQUENTIAL
              OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO, PERSONAL
              INJURY, PAIN AND SUFFERING, EMOTIONAL DISTRESS, LOSS OF REVENUE,
              LOSS OF PROFITS, LOSS OF BUSINESS OR ANTICIPATED SAVINGS, LOSS OF
              USE, LOSS OF GOODWILL, LOSS OF DATA, AND WHETHER CAUSED BY TORT
              (INCLUDING NEGLIGENCE), BREACH OF CONTRACT OR OTHERWISE, EVEN IF
              FORESEEABLE.
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{ marginLeft: "43.0pt", textIndent: "-25.0pt" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (B)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              THE FOREGOING DOES NOT AFFECT ANY LIABILITY WHICH CANNOT BE
              EXCLUDED OR LIMITED UNDER APPLICABLE LAW.
            </span>
          </p>

          <p className="MsoNormal">
            <b>
              <span style={{ fontFamily: "Avenir", color: "#333333" }}>
                XX. &nbsp; &nbsp;Indemnification.
              </span>
            </b>
          </p>
          <p className="MsoNormal">
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              You agree to defend, indemnify and hold harmless the Company, its
              affiliates, licensors and service providers, and its and their
              respective officers, directors, employees, contractors, agents,
              licensors, suppliers, successors and assignees from and against
              any claims, liabilities, damages, judgments, awards, losses,
              costs, expenses or fees (including reasonable attorneys’ fees)
              arising out of or relating to your violation of these Terms of Use
              or your use of the Website or Wadzoo, including, but not limited
              to, your User Uploads, any use of the Website or Wadzoo’s content,
              services and products other than as expressly authorized in these
              Terms of Use or your use of any information obtained from the
              Website or Wadzoo.
            </span>
          </p>
          <p className="MsoNormal">
            <b>
              <span style={{ fontFamily: "Avenir", color: "#333333" }}>
                XXI. &nbsp; &nbsp;Governing Law and Jurisdiction.
              </span>
            </b>
          </p>
          <p
            className="MsoListParagraphCxSpFirst"
            style={{ marginLeft: "43.0pt", textIndent: "-25.0pt" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (A)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              All matters relating to the Website, Wadzoo, Privacy Policy and
              these Terms of Use and any dispute or claim arising therefrom or
              related thereto (in each case, including non-contractual disputes
              or claims), shall be governed by and construed in accordance with
              the internal laws of the State of Florida without giving effect to
              any choice or conflict of law provision or rule (whether of the
              State of Florida or any other jurisdiction).
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{ marginLeft: "43.0pt", textIndent: "-25.0pt" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (B)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              Any legal suit, action or proceeding arising out of, or related
              to, these Terms of Use, Privacy Policy, Wadzoo, or the Website
              shall be instituted exclusively in the federal courts of the
              United States or the courts of the State of Florida and County of
              Sumter. You waive all objections to the exercise of jurisdiction
              over you by such courts and to venue in such courts.
            </span>
          </p>
          <p className="MsoListParagraphCxSpMiddle"></p>

          <p className="MsoNormal">
            <b>
              <span style={{ fontFamily: "Avenir", color: "#333333" }}>
                XXII. &nbsp; &nbsp;Dispute Resolution.
              </span>
            </b>
          </p>
          <p className="MsoNormal">
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              At the Company’s sole discretion, it may require you to submit any
              disputes arising from the use of these Terms of Use, the Privacy
              Policy, the Website, or Wadzoo, including disputes arising from or
              concerning their interpretation, violation, invalidity,
              non-performance, or termination, first to mediation agreed to in
              writing by the parties, then next to final and binding arbitration
              under the Rules of Arbitration of the American Arbitration
              Association applying Florida law.
            </span>
          </p>

          <p className="MsoNormal">
            <b>
              <span style={{ fontFamily: "Avenir", color: "#333333" }}>
                XXIII. &nbsp; &nbsp;Limitation on Time to File Claims.
              </span>
            </b>
          </p>
          <p className="MsoNormal">
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              ANY CAUSE OF ACTION OR CLAIM YOU MAY HAVE ARISING OUT OF OR
              RELATING TO THESE TERMS OF USE OR THE WEBSITE OR WADZOO MUST BE
              COMMENCED WITHIN SIX (6) MONTHS AFTER THE CAUSE OF ACTION ACCRUES.
              OTHERWISE, SUCH CAUSE OF ACTION OR CLAIM IS PERMANENTLY BARRED.
            </span>
          </p>
          <p className="MsoNormal">
            <b>
              <span style={{ fontFamily: "Avenir", color: "#333333" }}>
                XXIV. &nbsp; &nbsp;Waiver; Severability.
              </span>
            </b>
          </p>
          <p
            className="MsoListParagraphCxSpFirst"
            style={{ marginLeft: "43.0pt", textIndent: "-25.0pt" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (A)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              No waiver by the Company of any term or condition set forth in
              these Terms of Use shall be deemed a further or continuing waiver
              of such term or condition or a waiver of any other term or
              condition, and any failure of the Company to assert a right or
              provision under these Terms of Use shall not constitute a waiver
              of such right or provision.
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{ marginLeft: "43.0pt", textIndent: "-25.0pt" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (B)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              If any provision of these Terms of Use is held by a court or other
              tribunal of competent jurisdiction to be invalid, illegal, or
              unenforceable for any reason, such provision shall be eliminated
              or limited to the minimum extent such that the remaining
              provisions of the Terms of Use will continue in full force and
              effect.&nbsp;
            </span>
          </p>

          <p className="MsoNormal">
            <b>
              <span style={{ fontFamily: "Avenir", color: "#333333" }}>
                XXV. &nbsp; &nbsp;Entire Agreement.
              </span>
            </b>
          </p>
          <p className="MsoNormal">
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              The Terms of Use and our Privacy Policy constitute the sole and
              entire agreement between you and the Company with respect to the
              Website and Wadzoo, and supersede all prior and contemporaneous
              understandings, agreements, representations, and warranties, both
              written and oral, with respect to the Website and Wadzoo.&nbsp;
            </span>
          </p>

          <p className="MsoNormal">
            <b>
              <span style={{ fontFamily: "Avenir", color: "#333333" }}>
                XXVI. &nbsp; &nbsp;Your Comments and Concerns.
              </span>
            </b>
          </p>
          <p
            className="MsoListParagraphCxSpFirst"
            style={{ marginLeft: "43.0pt", textIndent: "-25.0pt" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (A)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              The Website and Wadzoo are operated by WADZOO, LLC, whose mailing
              address is 2444 SAFFRON LANE The Villages, FL 32162.
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{ marginLeft: "43.0pt", textIndent: "-25.0pt" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (B)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              All notices of copyright infringement claims should be sent to the
              Copyright Agent designated in our Copyright Policy (Section XI) in
              the manner and by the means set forth therein.
            </span>
          </p>

          <p
            className="MsoListParagraphCxSpMiddle"
            style={{ marginLeft: "43.0pt", textIndent: "-25.0pt" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              (C)
              <span style={{ font: '7.0pt "Times New Roman"' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              All other feedback, comments, requests for technical support and
              other{" "}
            </span>
          </p>
          <p
            className="MsoListParagraphCxSpLast"
            style={{ marginLeft: "43.0pt" }}
          >
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>
              communications relating to the Website or Wadzoo should be
              directed to:&nbsp;
            </span>
            <a href="mailto:support@wadzoo.com" target="_blank">
              <span style={{ fontFamily: "Avenir" }}>support@wadzoo.com</span>
            </a>
            <span style={{ fontFamily: "Avenir", color: "#333333" }}>.</span>
          </p>
          <p className="MsoNormal">&nbsp;</p>
        </div>
      </Container>
    </div>
  );
};

export default TermsOfUse;
