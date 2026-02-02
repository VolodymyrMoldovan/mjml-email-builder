// Raw MJML templates from mjml.io
// These can be imported directly using the importMjml function

export interface MjmlTemplate {
  id: string;
  name: string;
  description: string;
  category: 'marketing' | 'transactional' | 'newsletter' | 'notification' | 'ecommerce' | 'seasonal';
  mjml: string;
}

export const mjmlTemplates: MjmlTemplate[] = [
  {
    id: 'welcome-aboard',
    name: 'Welcome Aboard',
    description: 'Modern welcome email with hero image',
    category: 'transactional',
    mjml: `<mjml>
  <mj-body background-color="#ffffff">
    <mj-section background-color="#ffffff" padding-bottom="0px" padding-top="0">
      <mj-column vertical-align="top" width="100%">
        <mj-image
          src="https://static.mailjet.com/mjml-website/templates/welcome-hero.jpg"
          alt=""
          align="center"
          border="none"
          width="600px"
          padding-left="0px"
          padding-right="0px"
          padding-bottom="0px"
          padding-top="0"
        ></mj-image>
      </mj-column>
    </mj-section>
    <mj-section background-color="#009FE3" padding-bottom="0px" padding-top="0">
      <mj-column vertical-align="top" width="100%">
        <mj-text
          align="left"
          color="#ffffff"
          font-size="45px"
          font-weight="bold"
          font-family="open Sans Helvetica, Arial, sans-serif"
          padding-left="25px"
          padding-right="25px"
          padding-bottom="30px"
          padding-top="50px"
          >Welcome aboard</mj-text>
      </mj-column>
    </mj-section>
    <mj-section background-color="#009fe3" padding-bottom="20px" padding-top="20px">
      <mj-column vertical-align="middle" width="100%">
        <mj-text
          align="left"
          color="#ffffff"
          font-size="22px"
          font-family="open Sans Helvetica, Arial, sans-serif"
          padding-left="25px"
          padding-right="25px"
          ><span style="color: #feeb35">Dear {{FirstName}}</span><br /><br />
          Welcome to {{CompanyName}}.</mj-text>
        <mj-text
          align="left"
          color="#ffffff"
          font-size="15px"
          font-family="open Sans Helvetica, Arial, sans-serif"
          padding-left="25px"
          padding-right="25px"
          >We're really excited you've decided to give us a try. In case you have any questions, feel free to reach out to us at {{ContactEmail}}.</mj-text>
        <mj-button
          align="left"
          font-size="22px"
          font-weight="bold"
          background-color="#ffffff"
          border-radius="10px"
          color="#1AA0E1"
          font-family="open Sans Helvetica, Arial, sans-serif"
          >Login</mj-button>
        <mj-text
          align="left"
          color="#ffffff"
          font-size="15px"
          font-family="open Sans Helvetica, Arial, sans-serif"
          padding-left="25px"
          padding-right="25px"
          >Thanks, <br />
          The {{CompanyName}} Team</mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>`
  },
  {
    id: 'newsletter-digest',
    name: 'Newsletter Digest',
    description: 'Clean newsletter with featured content and social links',
    category: 'newsletter',
    mjml: `<mjml>
  <mj-body background-color="#E1E8ED">
    <mj-section padding-bottom="0px" background-color="white">
      <mj-column width="100%">
        <mj-image
          src="https://avatars0.githubusercontent.com/u/16115896?v=3&#38;s=200"
          width="50px"
        ></mj-image>
        <mj-divider
          padding-top="20px"
          padding-bottom="0px"
          padding-left="0px"
          padding-right="0px"
          border-width="1px"
          border-color="#f8f8f8"
        ></mj-divider>
      </mj-column>
    </mj-section>
    <mj-section padding-bottom="0px" background-color="#fcfcfc">
      <mj-column width="100%">
        <mj-text
          align="center"
          font-size="20px"
          color="grey"
          font-family="Helvetica Neue"
          font-weight="200"
          >Here is what you've missed</mj-text>
        <mj-divider
          padding-top="20px"
          padding-bottom="0px"
          padding-left="0px"
          padding-right="0px"
          border-width="1px"
          border-color="#f8f8f8"
        ></mj-divider>
      </mj-column>
    </mj-section>
    <mj-section background-color="white">
      <mj-column width="130px">
        <mj-image
          src="https://mjml.io/assets/img/responsive.png"
          width="100px"
        ></mj-image>
      </mj-column>
      <mj-column width="350px">
        <mj-text align="left" font-size="20px" color="grey">Sed ut perspiciatis</mj-text>
        <mj-text align="left" color="grey">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</mj-text>
      </mj-column>
    </mj-section>
    <mj-section padding-bottom="0px" background-color="#f3f3f3">
      <mj-column>
        <mj-text align="center" font-size="20px" color="rgb(165, 176, 184)">Explore our new features</mj-text>
      </mj-column>
    </mj-section>
    <mj-section padding-top="0" background-color="#f3f3f3">
      <mj-column width="100%">
        <mj-image src="https://cloud.githubusercontent.com/assets/6558790/12450760/ee034178-bf85-11e5-9dda-98d0c8f9f8d6.png"></mj-image>
      </mj-column>
    </mj-section>
    <mj-section background-color="#fcfcfc" padding-top="20px">
      <mj-column width="130px">
        <mj-image src="https://mjml.io/assets/img/easy-and-quick.png" width="100px"></mj-image>
      </mj-column>
      <mj-column width="350px">
        <mj-text align="left" font-size="20px" color="grey">Right on time!</mj-text>
        <mj-text align="left" color="grey">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</mj-text>
      </mj-column>
    </mj-section>
    <mj-section background-color="#f3f3f3">
      <mj-column>
        <mj-text align="center">Stay in touch!</mj-text>
        <mj-social mode="horizontal">
          <mj-social-element name="twitter"></mj-social-element>
          <mj-social-element name="facebook"></mj-social-element>
        </mj-social>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>`
  },
  {
    id: 'black-friday-sale',
    name: 'Black Friday Sale',
    description: 'Bold promotional email for sales events',
    category: 'marketing',
    mjml: `<mjml>
  <mj-body background-color="#F4F4F4">
    <mj-section background-color="#000000" background-repeat="no-repeat" text-align="center">
      <mj-column>
        <mj-image
          align="center"
          border="none"
          padding-bottom="30px"
          padding="10px 25px"
          src="https://static.mailjet.com/mjml-website/templates/black-friday-logo.png"
          target="_blank"
          width="180px"
        ></mj-image>
        <mj-text align="center" color="#ffffff" font-size="14px" font-family="Times New Roman, Helvetica, Arial, sans-serif" padding="10px 25px">
          WOMEN &#160; | &#160; MEN &#160; | &#160; KIDS
        </mj-text>
      </mj-column>
    </mj-section>
    <mj-section background-color="#000000" background-repeat="no-repeat" text-align="center" padding="0 0 0 0">
      <mj-column>
        <mj-image
          align="center"
          border="none"
          padding="0px"
          src="https://static.mailjet.com/mjml-website/templates/black-friday-hero.jpg"
          width="780px"
        ></mj-image>
      </mj-column>
    </mj-section>
    <mj-section background-color="#000000" background-repeat="no-repeat" text-align="center" padding="0 0 0 0">
      <mj-column>
        <mj-text align="center" color="#fcfcfc" font-size="55px" font-family="Times New Roman, Helvetica, Arial, sans-serif" padding="25px 25px 5px 25px">
          <b>Black Friday</b>
        </mj-text>
        <mj-text align="center" color="#f5f5f5" font-size="25px" font-family="Times New Roman, Helvetica, Arial, sans-serif" padding="10px 25px 20px 25px">
          <b>Take an extra 50% off</b><br/>
          <span style="font-size: 18px;">Use code SALEONSALE* at checkout</span>
        </mj-text>
      </mj-column>
    </mj-section>
    <mj-section background-color="#000000" background-repeat="no-repeat" text-align="center" padding-bottom="40px" padding="0 0 0 0">
      <mj-column>
        <mj-button
          background-color="#ffffff"
          border-radius="3px"
          font-family="Times New Roman, Helvetica, Arial, sans-serif"
          font-size="18px"
          inner-padding="10px 25px"
          padding-bottom="30px"
          color="#212020"
          >Shop Now</mj-button>
        <mj-text align="center" color="#ffffff" font-size="12px" font-family="Times New Roman, Helvetica, Arial, sans-serif" padding="10px 25px">
          * Offer valid on selected items. Cannot be combined with other offers.
        </mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>`
  },
  {
    id: 'card-promo',
    name: 'Card Promotion',
    description: 'Clean card-style promotional email',
    category: 'marketing',
    mjml: `<mjml>
  <mj-head>
    <mj-attributes>
      <mj-all font-family="Montserrat, Helvetica, Arial, sans-serif"></mj-all>
      <mj-text font-weight="400" font-size="16px" color="#000000" line-height="24px"></mj-text>
      <mj-section padding="0px"></mj-section>
    </mj-attributes>
  </mj-head>
  <mj-body background-color="#F2F2F2">
    <mj-section padding="10px 0 20px 0">
      <mj-column>
        <mj-text align="center" color="#9B9B9B" font-size="11px">Writing A Good Headline For Your Advertisement</mj-text>
      </mj-column>
    </mj-section>
    <mj-section padding="20px 20px 0 20px" background-color="#FFFFFF">
      <mj-column width="35%">
        <mj-text align="left" font-size="20px" font-weight="500">// BR&#38;AND</mj-text>
      </mj-column>
      <mj-column width="65%">
        <mj-text align="right" font-size="11px">HOME &#160;/&#160; SERVICE &#160;/&#160; CONTACT</mj-text>
      </mj-column>
    </mj-section>
    <mj-section padding="20px 20px 0 20px" background-color="#FFFFFF">
      <mj-column>
        <mj-text align="center" font-weight="300" padding="30px 40px 10px 40px" font-size="32px" line-height="40px" color="#5FA91D">
          Free Advertising For Your Online Business.
        </mj-text>
      </mj-column>
    </mj-section>
    <mj-section padding="10px 20px" background-color="#FFFFFF">
      <mj-column>
        <mj-divider width="30px" border-width="3px" border-color="#9B9B9B"></mj-divider>
      </mj-column>
    </mj-section>
    <mj-section padding="0 20px 20px 20px" background-color="#FFFFFF">
      <mj-column width="80%">
        <mj-text align="center" padding-top="10px" font-weight="500" padding="0px">
          A Right Media Mix Can Make The Difference.
        </mj-text>
      </mj-column>
    </mj-section>
    <mj-section background-url="https://static.mailjet.com/mjml-website/templates/card-bg.jpg" background-size="cover" background-repeat="no-repeat">
      <mj-column width="100%">
        <mj-image src="https://static.mailjet.com/mjml-website/templates/card-lineshadow.png" alt="" align="center" border="none" padding="0px"></mj-image>
        <mj-text align="center" padding="50px 40px 0 40px" font-weight="300">
          Marketers/advertisers usually focus their efforts on the people responsible for making the purchase.
        </mj-text>
        <mj-button align="center" background-color="#5FA91D" color="#FFFFFF" border-radius="2px" href="#" inner-padding="15px 30px" padding-bottom="100px" padding-top="20px">
          CALL TO ACTION
        </mj-button>
      </mj-column>
    </mj-section>
    <mj-section padding="50px 0 0 0" background-color="#FFFFFF">
      <mj-column>
        <mj-image src="https://static.mailjet.com/mjml-website/templates/card-bottom.png" alt="bottom border" align="center" border="none" padding="0px"></mj-image>
      </mj-column>
    </mj-section>
    <mj-section padding="10px 0 20px 0">
      <mj-column>
        <mj-text align="center" color="#9B9B9B" font-size="11px">
          Unsubscribe from this newsletter
        </mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>`
  },
  {
    id: 'appointment-alert',
    name: 'Appointment Alert',
    description: 'Clean appointment reminder with action buttons',
    category: 'notification',
    mjml: `<mjml>
  <mj-head>
    <mj-attributes>
      <mj-all font-family="'Source Sans 3', Helvetica, Arial, sans-serif"></mj-all>
      <mj-text font-weight="400" font-size="18px" color="#1D3C6B" line-height="26px" align="center" padding="0px"></mj-text>
    </mj-attributes>
  </mj-head>
  <mj-body background-color="#fff">
    <mj-section background-color="transparent" padding="16px 0px 16px 0px">
      <mj-column>
        <mj-text color="#6a7f9e" font-size="14px" line-height="24px">
          View in browser
        </mj-text>
      </mj-column>
    </mj-section>
    <mj-section background-color="transparent" padding="0px">
      <mj-column padding="0px">
        <mj-image padding="0px" src="https://placehold.co/600x200/4F77B4/ffffff?text=Calendar"></mj-image>
      </mj-column>
    </mj-section>
    <mj-section background-color="#F4F9FF" padding="30px 40px">
      <mj-column width="100%">
        <mj-text padding="0px" font-size="28px" line-height="34px" font-weight="600">Hello there! 👋</mj-text>
        <mj-spacer height="30px"></mj-spacer>
        <mj-text>Just a friendly reminder that we have an upcoming appointment.</mj-text>
        <mj-spacer height="30px"></mj-spacer>
        <mj-text><b>Date:</b> {{AppointmentDate}}</mj-text>
        <mj-spacer height="14px"></mj-spacer>
        <mj-text><b>Type:</b> {{AppointmentType}}</mj-text>
        <mj-spacer height="14px"></mj-spacer>
        <mj-text><b>Duration:</b> {{Duration}}</mj-text>
        <mj-spacer height="30px"></mj-spacer>
        <mj-text padding="14px 10px" container-background-color="#FFF8E8" color="#484234">
          Thank you for scheduling the meeting. If you need assistance before the meeting, please call our support line.
        </mj-text>
      </mj-column>
    </mj-section>
    <mj-section background-color="#F4F9FF" border-radius="0px 0px 30px 30px" padding="0px 30px 50px 40px">
      <mj-column width="48%">
        <mj-button href="#" padding="0px" border-radius="12px" border="1px solid #0D3D85" background-color="#4F77B4" font-size="18px" width="100%">
          Reschedule
        </mj-button>
      </mj-column>
      <mj-column width="4%" padding="10px"></mj-column>
      <mj-column width="48%">
        <mj-button href="#" padding="0px" border-radius="12px" border="1px solid #850D0D" background-color="#C75353" font-size="18px" width="100%">
          Cancel
        </mj-button>
      </mj-column>
    </mj-section>
    <mj-section background-color="transparent" padding="16px 0px 40px 0px">
      <mj-column>
        <mj-text color="#6a7f9e" font-size="14px" line-height="24px">
          © {{CompanyName}}. All rights reserved.
        </mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>`
  },
  {
    id: 'food-delivery',
    name: 'Food Delivery Receipt',
    description: 'Order confirmation with itemized receipt',
    category: 'ecommerce',
    mjml: `<mjml>
  <mj-head>
    <mj-attributes>
      <mj-text font-family="'Inter',Helvetica,Arial,sans-serif"></mj-text>
    </mj-attributes>
  </mj-head>
  <mj-body background-color="#173831">
    <mj-section background-color="transparent" padding="20px 0px">
      <mj-column width="100%">
        <mj-text padding="0px" line-height="20px" align="center" color="#FEFFEA" font-size="12px">
          Having trouble reading this email? Click here.
        </mj-text>
      </mj-column>
    </mj-section>
    <mj-section border-radius="8px" padding="0px" background-color="#155F50">
      <mj-column width="55%" padding="40px">
        <mj-text font-size="20px" line-height="30px" font-weight="700" padding="0px" align="left" color="#FEFFEA">
          Hello {{CustomerName}},<br/>Thanks for your order!
        </mj-text>
        <mj-spacer height="14px"></mj-spacer>
        <mj-text font-size="14px" line-height="20px" padding="0px" align="left" color="#cfdfcb">
          Here are the receipt of your order.
        </mj-text>
      </mj-column>
      <mj-column vertical-align="bottom" width="45%">
        <mj-image align="center" padding="0px" src="https://placehold.co/200x150/155F50/ffffff?text=Delivery"></mj-image>
      </mj-column>
    </mj-section>
    <mj-section padding="0px">
      <mj-column padding="0px">
        <mj-spacer height="14px"></mj-spacer>
      </mj-column>
    </mj-section>
    <mj-section padding="30px 40px 26px 40px" border-radius="8px 8px 0px 0px" background-color="#FEFFEA">
      <mj-column width="50%" vertical-align="middle">
        <mj-text font-size="16px" color="#0A0908" font-weight="700" padding="0px">Products</mj-text>
      </mj-column>
      <mj-column width="50%" vertical-align="middle">
        <mj-text color="#0A0908" font-size="10px" padding="0px" align="right">
          Order ID: {{OrderId}}
        </mj-text>
      </mj-column>
    </mj-section>
    <mj-section padding="0px 40px 26px 40px" background-color="#FEFFEA">
      <mj-column width="10%" vertical-align="middle">
        <mj-text line-height="20px" font-size="14px" padding="0px" font-weight="700">x1</mj-text>
      </mj-column>
      <mj-column width="80%" vertical-align="middle">
        <mj-text line-height="20px" font-size="14px" padding="0px">{{Item1Name}}</mj-text>
      </mj-column>
      <mj-column width="10%" vertical-align="middle">
        <mj-text line-height="20px" font-size="14px" padding="0px">{{Item1Price}}</mj-text>
      </mj-column>
    </mj-section>
    <mj-section padding="26px 40px" background-color="#f1f2de">
      <mj-column width="90%" vertical-align="middle">
        <mj-text line-height="20px" font-size="14px" color="#0A0908" font-weight="700" padding="0px">Total</mj-text>
      </mj-column>
      <mj-column width="10%" vertical-align="middle">
        <mj-text line-height="20px" font-size="14px" padding="0px">{{Total}}</mj-text>
      </mj-column>
    </mj-section>
    <mj-section border-radius="0px 0px 8px 8px" padding="0px 40px 26px 40px" background-color="#f1f2de">
      <mj-column>
        <mj-text color="#636363" line-height="16px" font-size="10px" padding="0px">
          The receipt prices include the obligatory country tax, in compliance with legal requirements.
        </mj-text>
      </mj-column>
    </mj-section>
    <mj-section background-color="transparent" padding="30px 0px">
      <mj-column width="100%">
        <mj-text padding="0px" line-height="20px" align="center" color="#FEFFEA" font-size="12px">
          <b>Issues with your order?</b><br/>
          Contact us at {{SupportEmail}} or call {{SupportPhone}}
        </mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>`
  },
  {
    id: 'travel-reactivation',
    name: 'Travel Reactivation',
    description: 'Win-back email featuring travel destinations',
    category: 'marketing',
    mjml: `<mjml>
  <mj-head>
    <mj-attributes>
      <mj-all padding="0px"></mj-all>
    </mj-attributes>
  </mj-head>
  <mj-body background-color="#e0f2ff">
    <mj-section background-color="#2a5cab" padding="10px 0">
      <mj-column width="33%">
        <mj-image src="https://static.mailjet.com/mjml-website/templates/reactivation-logo.png" alt="logo" width="150px" padding="10px 0"></mj-image>
      </mj-column>
      <mj-column width="66%">
        <mj-text align="left" color="#ffffff" font-size="20px" font-family="Lato, Helvetica, Arial, sans-serif" padding="18px 0px">
          the only way to travel
        </mj-text>
      </mj-column>
    </mj-section>
    <mj-section background-color="#ffffff" padding-top="20px">
      <mj-column width="100%">
        <mj-image src="https://static.mailjet.com/mjml-website/templates/reactivation-tickets.png" alt="tickets" width="192px" padding="10px 25px"></mj-image>
        <mj-text align="center" color="#FAB701" font-size="25px" font-family="Lato, Helvetica, Arial, sans-serif" padding="10px 25px">
          <strong>Hey {{FirstName}}<br/><br/>It's been a long time since you last traveled with us.</strong>
        </mj-text>
        <mj-text align="center" color="#EC652D" font-size="18px" font-family="Lato, Helvetica, Arial, sans-serif" padding="10px 30px">
          <strong>Have a look at some of the top destinations people are booking right now!</strong>
        </mj-text>
      </mj-column>
    </mj-section>
    <mj-section background-color="#ffffff" padding="20px 0">
      <mj-column>
        <mj-image src="https://static.mailjet.com/mjml-website/templates/reactivation-city-1.jpg" alt="New York" width="184px" padding="0 25px"></mj-image>
        <mj-text align="center" color="#EC652D" font-size="20px" font-family="Lato, Helvetica, Arial, sans-serif" padding="20px 25px">
          <strong>New York</strong><br/>$399
        </mj-text>
      </mj-column>
      <mj-column>
        <mj-image src="https://static.mailjet.com/mjml-website/templates/reactivation-city-2.jpg" alt="London" width="184px" padding="0 25px"></mj-image>
        <mj-text align="center" color="#EC652D" font-size="20px" font-family="Lato, Helvetica, Arial, sans-serif" padding="20px 25px">
          <strong>London</strong><br/>$399
        </mj-text>
      </mj-column>
      <mj-column>
        <mj-image src="https://static.mailjet.com/mjml-website/templates/reactivation-city-3.jpg" alt="Berlin" width="184px" padding="0 25px"></mj-image>
        <mj-text align="center" color="#EC652D" font-size="20px" font-family="Lato, Helvetica, Arial, sans-serif" padding="20px 25px">
          <strong>Berlin</strong><br/>$399
        </mj-text>
      </mj-column>
    </mj-section>
    <mj-section background-color="#FAB700" padding="10px">
      <mj-column vertical-align="top" width="100%">
        <mj-text align="center" color="#EC652D" font-size="20px" font-family="Lato, Helvetica, Arial, sans-serif" padding="10px 25px">
          Best,<br/><br/>The {{CompanyName}} Team
        </mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>`
  },
  {
    id: 'referral-program',
    name: 'Referral Program',
    description: 'Encourage referrals with discount incentive',
    category: 'marketing',
    mjml: `<mjml>
  <mj-head>
    <mj-attributes>
      <mj-all padding="0px"></mj-all>
      <mj-text font-family="Ubuntu, Helvetica, Arial, sans-serif" padding="0 25px" font-size="13px"></mj-text>
      <mj-section background-color="#ffffff"></mj-section>
    </mj-attributes>
  </mj-head>
  <mj-body background-color="#bedae6">
    <mj-section>
      <mj-column width="100%">
        <mj-image src="https://static.mailjet.com/mjml-website/templates/referral-hero.jpg" alt="header image" padding="0px"></mj-image>
      </mj-column>
    </mj-section>
    <mj-section padding-bottom="20px" padding-top="10px">
      <mj-column>
        <mj-text align="center" padding="10px 25px" font-size="20px" color="#512d0b">
          <strong>Hey {{FirstName}}!</strong>
        </mj-text>
        <mj-text align="center" font-size="18px" font-family="Arial">
          Are you enjoying our weekly newsletter?<br/>Then why not share it with your friends?
        </mj-text>
        <mj-text align="center" color="#489BDA" font-size="25px" font-family="Arial, sans-serif" font-weight="bold" line-height="35px" padding-top="20px">
          You'll get a 15% discount<br/>
          <span style="font-size: 18px">on your next order when a friend uses the code {{ReferralCode}}!</span>
        </mj-text>
        <mj-button background-color="#8bb420" color="#FFFFFF" href="#" font-family="Arial, sans-serif" padding="20px 0 0 0" font-weight="bold" font-size="16px">
          Refer a friend now
        </mj-button>
        <mj-text align="center" color="#000000" font-size="14px" font-family="Arial, sans-serif" padding-top="40px">
          Best,<br/>The {{CompanyName}} Team
        </mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>`
  },
  {
    id: 'basic-company',
    name: 'Basic Company',
    description: 'Simple company template with hero and content sections',
    category: 'newsletter',
    mjml: `<mjml>
  <mj-body>
    <mj-section background-color="#f0f0f0">
      <mj-column>
        <mj-text font-style="italic" font-size="20px" color="#626262">My Company</mj-text>
      </mj-column>
    </mj-section>
    <mj-section background-url="https://placehold.co/600x300/666666/ffffff?text=Hero+Image" background-size="cover" background-repeat="no-repeat">
      <mj-column width="600px">
        <mj-text align="center" color="#fff" font-size="40px" font-family="Helvetica Neue">Slogan here</mj-text>
        <mj-button background-color="#F63A4D" href="#">Promotion</mj-button>
      </mj-column>
    </mj-section>
    <mj-section background-color="#fafafa">
      <mj-column width="400px">
        <mj-text font-style="italic" font-size="20px" font-family="Helvetica Neue" color="#626262">My Awesome Text</mj-text>
        <mj-text color="#525252">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin rutrum enim eget magna efficitur, eu semper augue semper.
        </mj-text>
        <mj-button background-color="#F45E43" href="#">Learn more</mj-button>
      </mj-column>
    </mj-section>
    <mj-section background-color="white">
      <mj-column>
        <mj-image width="200px" src="https://placehold.co/200x200/cccccc/666666?text=Image"></mj-image>
      </mj-column>
      <mj-column>
        <mj-text font-style="italic" font-size="20px" font-family="Helvetica Neue" color="#626262">Find amazing places</mj-text>
        <mj-text color="#525252">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin rutrum enim eget magna efficitur.
        </mj-text>
      </mj-column>
    </mj-section>
    <mj-section background-color="#fbfbfb">
      <mj-column>
        <mj-image width="100px" src="https://placehold.co/100x100/3498db/ffffff?text=1"></mj-image>
      </mj-column>
      <mj-column>
        <mj-image width="100px" src="https://placehold.co/100x100/e74c3c/ffffff?text=2"></mj-image>
      </mj-column>
      <mj-column>
        <mj-image width="100px" src="https://placehold.co/100x100/2ecc71/ffffff?text=3"></mj-image>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>`
  },
  {
    id: 'christmas-holiday',
    name: 'Christmas Holiday',
    description: 'Festive holiday template with product showcase',
    category: 'seasonal',
    mjml: `<mjml>
  <mj-body background-color="#F4F4F4">
    <mj-section background-color="#ffffff" padding-bottom="0px" padding-top="30px" padding="20px 0" text-align="center">
      <mj-column>
        <mj-image align="center" padding="10px 25px" src="https://static.mailjet.com/mjml-website/templates/christmas-logo.png" width="214px"></mj-image>
        <mj-text align="center" color="#151e23" font-size="14px" font-family="Georgia, Helvetica, Arial, sans-serif" padding="10px 25px">
          Product | Concept | Contact
        </mj-text>
      </mj-column>
    </mj-section>
    <mj-section padding-bottom="0px" padding-top="0px" padding="20px 0" text-align="center">
      <mj-column>
        <mj-image align="center" padding="0px" src="https://static.mailjet.com/mjml-website/templates/christmas-hero.jpg" width="600px"></mj-image>
      </mj-column>
    </mj-section>
    <mj-section background-color="#ffffff" padding-bottom="0px" padding-top="30px" padding="20px 0" text-align="center">
      <mj-column>
        <mj-text align="center" color="#151e23" font-size="30px" font-family="Georgia, Helvetica, Arial, sans-serif" padding="10px 25px">
          - Our Holiday Recipes -
        </mj-text>
      </mj-column>
    </mj-section>
    <mj-section background-color="#ffffff" padding-bottom="0px" padding="20px 0" text-align="center">
      <mj-column>
        <mj-image align="center" padding="0px 30px 20px 30px" src="https://static.mailjet.com/mjml-website/templates/christmas-product-1.jpg"></mj-image>
      </mj-column>
      <mj-column>
        <mj-text align="left" color="#151e23" font-size="16px" font-family="Georgia, Helvetica, Arial, sans-serif" padding="0px 40px">
          <b>Cake Title</b>
        </mj-text>
        <mj-text align="left" color="#354552" font-size="14px" font-family="Georgia, Helvetica, Arial, sans-serif" padding="10px 40px">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
        </mj-text>
        <mj-text align="left" color="#354552" font-size="14px" font-family="Georgia, Helvetica, Arial, sans-serif" padding="0px 40px">
          <u>Choose me</u> >
        </mj-text>
      </mj-column>
    </mj-section>
    <mj-section background-color="#ffffff" padding-top="0px" padding="20px 0" text-align="center">
      <mj-column>
        <mj-button align="center" background-color="#354552" border-radius="3px" color="#ffffff" font-family="Georgia, Helvetica, Arial, sans-serif" font-size="14px" inner-padding="10px 25px" padding="10px 25px">
          Discover all desserts
        </mj-button>
      </mj-column>
    </mj-section>
    <mj-section background-color="#ffffff" padding-bottom="0px" padding-top="0px" padding="20px 0" text-align="center">
      <mj-column>
        <mj-image align="center" padding="0px" src="https://static.mailjet.com/mjml-website/templates/christmas-footer.jpg" width="600px"></mj-image>
      </mj-column>
    </mj-section>
    <mj-section background-color="#ffffff" padding="20px 0" text-align="center">
      <mj-column>
        <mj-image align="center" padding="10px 25px" src="https://static.mailjet.com/mjml-website/templates/christmas-logo.png" width="202px"></mj-image>
        <mj-social align="center">
          <mj-social-element name="facebook"></mj-social-element>
          <mj-social-element name="pinterest"></mj-social-element>
          <mj-social-element name="instagram"></mj-social-element>
        </mj-social>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>`
  },
  {
    id: 'happy-new-year',
    name: 'Happy New Year',
    description: 'Festive New Year greeting email',
    category: 'seasonal',
    mjml: `<mjml>
  <mj-body background-color="#F4F4F4">
    <mj-section background-color="#C1272D" background-repeat="repeat" padding="20px 0" text-align="center">
      <mj-column>
        <mj-image align="center" padding="10px 25px" src="https://static.mailjet.com/mjml-website/templates/happy-new-year-logo.png" width="128px"></mj-image>
      </mj-column>
    </mj-section>
    <mj-section background-color="#ffffff" background-repeat="repeat" padding="20px 0" text-align="center">
      <mj-column>
        <mj-image align="center" padding="10px 25px" src="https://static.mailjet.com/mjml-website/templates/happy-new-year-hero.gif" width="600px"></mj-image>
        <mj-image align="center" alt="Happy New Year!" container-background-color="#ffffff" padding="10px 25px" src="https://static.mailjet.com/mjml-website/templates/happy-new-year-text.png" width="399px"></mj-image>
      </mj-column>
    </mj-section>
    <mj-section background-color="#ffffff" background-repeat="repeat" background-size="auto" padding="20px 0px 20px 0px" text-align="center">
      <mj-column>
        <mj-text align="center" color="#55575d" font-family="Arial, sans-serif" font-size="14px" line-height="28px" padding="0px 25px 0px 25px">New dreams, new hopes, new experiences and new joys, we wish you all the best for this New Year!</mj-text>
        <mj-image align="center" alt="Best wishes from our Team!" padding="10px 25px" src="https://static.mailjet.com/mjml-website/templates/happy-new-year-signature.png" width="142px"></mj-image>
      </mj-column>
    </mj-section>
    <mj-section background-color="#C1272D" background-repeat="repeat" padding="20px 0" text-align="center">
      <mj-column>
        <mj-text align="center" color="#ffffff" font-family="Arial, sans-serif" font-size="13px" line-height="22px" padding="10px 25px">Wishing you a wonderful year ahead!</mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>`
  },
  {
    id: 'loyalty-client',
    name: 'Loyalty Client',
    description: 'Dark themed loyalty discount email',
    category: 'marketing',
    mjml: `<mjml>
  <mj-head>
    <mj-attributes>
      <mj-all font-family="Helvetica, Arial, sans-serif"></mj-all>
      <mj-text font-weight="400" font-size="14px" color="#ffffff" line-height="22px"></mj-text>
    </mj-attributes>
  </mj-head>
  <mj-body background-color="#070e07">
    <mj-section background-color="transparent" padding="20px 0px 20px 0px">
      <mj-column>
        <mj-text color="#fff" font-size="12px" padding="0px" align="center" line-height="22px">Having trouble reading this email? Click here.</mj-text>
      </mj-column>
    </mj-section>
    <mj-section border-radius="20px" background-color="#0C170C" padding="30px 40px">
      <mj-column width="100%">
        <mj-image padding="0px" width="162px" src="https://placehold.co/162x50/0C170C/77E375?text=LOGO"></mj-image>
        <mj-spacer height="40px"></mj-spacer>
        <mj-image padding="0px" width="180px" src="https://placehold.co/180x180/0C170C/77E375?text=GIFT"></mj-image>
        <mj-spacer height="30px"></mj-spacer>
        <mj-text color="#fff" padding="0px" align="center" font-size="28px" line-height="34px">A gift for you!</mj-text>
        <mj-spacer height="30px"></mj-spacer>
        <mj-text color="#fff" padding="0px" line-height="22px">Since you are one of our loyal customers, we want to show our appreciation for your continued support. We are pleased to offer you the opportunity to purchase anything from our online store at a 20% discount.</mj-text>
        <mj-spacer height="30px"></mj-spacer>
        <mj-button padding="0px" border-radius="10px" font-size="20px" inner-padding="14px 28px" background-color="#77E375" color="#070e07">LOYAL20</mj-button>
        <mj-spacer height="20px"></mj-spacer>
        <mj-text padding="0px" align="center" color="#B4B4B4" line-height="22px">Hurry! This promotional code is only valid for 3 days.</mj-text>
        <mj-spacer height="40px"></mj-spacer>
        <mj-social mode="horizontal" icon-size="28px" padding="0px" inner-padding="10px">
          <mj-social-element name="facebook" href="#" background-color="transparent"></mj-social-element>
          <mj-social-element name="twitter" href="#" background-color="transparent"></mj-social-element>
          <mj-social-element name="instagram" href="#" background-color="transparent"></mj-social-element>
        </mj-social>
        <mj-spacer height="20px"></mj-spacer>
        <mj-text padding="0px" align="center" color="#fff" line-height="22px">© Your company</mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>`
  },
  {
    id: 'proof-articles',
    name: 'Proof Articles',
    description: 'Clean article grid layout',
    category: 'newsletter',
    mjml: `<mjml>
  <mj-body>
    <mj-section>
      <mj-column>
        <mj-image width="162px" src="https://static.mailjet.com/mjml-website/templates/proof-logo.png"></mj-image>
      </mj-column>
    </mj-section>
    <mj-section background-color="#f3f3f3">
      <mj-column>
        <mj-image width="170px" src="https://static.mailjet.com/mjml-website/templates/proof-main.png"></mj-image>
      </mj-column>
      <mj-column>
        <mj-text font-weight="bold" align="justify" font-size="24px" color="#000" font-family="helvetica">Article Title</mj-text>
        <mj-text align="justify" font-size="15px" color="#000" font-family="helvetica">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sit amet ipsum consequat.</mj-text>
        <mj-button align="left" background-color="#8ccaca" border-radius="40px" font-family="helvetica" font-size="12px">READ MORE</mj-button>
      </mj-column>
    </mj-section>
    <mj-section>
      <mj-column>
        <mj-image width="165px" src="https://static.mailjet.com/mjml-website/templates/proof-article-1.png"></mj-image>
        <mj-text font-weight="bold" align="center" font-size="16px" color="#000" font-family="helvetica">Article Title</mj-text>
        <mj-text align="justify" font-size="13px" color="#000" font-family="helvetica">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</mj-text>
        <mj-button background-color="#8ccaca" border-radius="40px" font-family="helvetica" font-size="12px">READ MORE</mj-button>
      </mj-column>
      <mj-column>
        <mj-image width="165px" src="https://static.mailjet.com/mjml-website/templates/proof-article-2.png"></mj-image>
        <mj-text font-weight="bold" align="center" font-size="16px" color="#000" font-family="helvetica">Article Title</mj-text>
        <mj-text align="justify" font-size="13px" color="#000" font-family="helvetica">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</mj-text>
        <mj-button background-color="#8ccaca" border-radius="40px" font-family="helvetica" font-size="12px">READ MORE</mj-button>
      </mj-column>
      <mj-column>
        <mj-image width="165px" src="https://static.mailjet.com/mjml-website/templates/proof-article-3.png"></mj-image>
        <mj-text font-weight="bold" align="center" font-size="16px" color="#000" font-family="helvetica">Article Title</mj-text>
        <mj-text align="justify" font-size="13px" color="#000" font-family="helvetica">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</mj-text>
        <mj-button background-color="#8ccaca" border-radius="40px" font-family="helvetica" font-size="12px">READ MORE</mj-button>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>`
  },
  {
    id: 'onepage-landing',
    name: 'OnePage Landing',
    description: 'Full landing page style email',
    category: 'marketing',
    mjml: `<mjml>
  <mj-body background-color="#d7dde5">
    <mj-section background-color="#ffffff" full-width="full-width">
      <mj-column width="33.33%" vertical-align="middle">
        <mj-image src="https://static.mailjet.com/mjml-website/templates/onepage-logo.png" alt="OnePage" padding-bottom="0px" padding-top="10px"></mj-image>
      </mj-column>
      <mj-column width="66.66%" vertical-align="middle">
        <mj-text align="center" padding-bottom="0px" padding-top="10px">Home &#160;&#160; Features &#160;&#160; Portfolio</mj-text>
      </mj-column>
    </mj-section>
    <mj-section background-url="https://static.mailjet.com/mjml-website/templates/onepage-hero.jpg" background-size="cover" full-width="full-width" background-repeat="no-repeat">
      <mj-column width="100%" vertical-align="middle">
        <mj-text align="center" font-size="14px" color="#45474e" padding-bottom="10px" padding-top="45px">More than an email template<br/><br/>Only on Mailjet template builder</mj-text>
        <mj-button align="center" background-color="#e85034" color="#fff" border-radius="24px" href="#" padding-bottom="45px" padding-top="10px">SUBSCRIBE</mj-button>
      </mj-column>
    </mj-section>
    <mj-section background-color="#ffffff" full-width="full-width">
      <mj-column vertical-align="top" width="33.33%">
        <mj-image src="https://static.mailjet.com/mjml-website/templates/onepage-icon1.png" alt="" width="50px"></mj-image>
        <mj-text align="center" color="#9da3a3" font-size="11px" padding-bottom="30px">Best audience<br/><br/>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</mj-text>
      </mj-column>
      <mj-column vertical-align="top" width="33.33%">
        <mj-image src="https://static.mailjet.com/mjml-website/templates/onepage-icon2.png" alt="" width="50px"></mj-image>
        <mj-text align="center" color="#9da3a3" font-size="11px" padding-bottom="30px">Higher rates<br/><br/>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</mj-text>
      </mj-column>
      <mj-column vertical-align="top" width="33.33%">
        <mj-image src="https://static.mailjet.com/mjml-website/templates/onepage-icon3.png" alt="" width="50px"></mj-image>
        <mj-text align="center" color="#9da3a3" font-size="11px" padding-bottom="30px">24/7 Support<br/><br/>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</mj-text>
      </mj-column>
    </mj-section>
    <mj-section background-color="#e85034" full-width="full-width">
      <mj-column width="100%" vertical-align="middle">
        <mj-text align="center" color="#ffffff" font-size="18px" padding-bottom="10px">Why choose us?</mj-text>
        <mj-divider border-color="#fff" border-style="solid" border-width="1px" padding-left="100px" padding-right="100px" padding-bottom="20px" padding-top="20px"></mj-divider>
        <mj-text align="center" color="#f8d5d1" font-size="11px" padding-bottom="25px">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</mj-text>
      </mj-column>
    </mj-section>
    <mj-section background-color="#ffffff" full-width="full-width">
      <mj-column width="50%" vertical-align="middle">
        <mj-image src="https://static.mailjet.com/mjml-website/templates/onepage-image.jpg" alt="" padding-bottom="20px" padding-top="20px"></mj-image>
      </mj-column>
      <mj-column width="50%" vertical-align="middle">
        <mj-text align="left" color="#9da3a3" font-size="11px" padding-bottom="25px" padding-top="25px">Great newsletter for the best company out there<br/><br/>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</mj-text>
        <mj-button align="left" background-color="#e85034" color="#fff" border-radius="24px" font-size="11px" href="#" padding-bottom="45px" padding-top="10px">READ MORE</mj-button>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>`
  }
];

export const getMjmlTemplatesByCategory = (category: MjmlTemplate['category']) => {
  return mjmlTemplates.filter(t => t.category === category);
};

export const getMjmlTemplateById = (id: string) => {
  return mjmlTemplates.find(t => t.id === id);
};
