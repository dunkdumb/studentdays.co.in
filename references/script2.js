
(function(){
['av','wv2'].forEach(function(id){var e=document.getElementById(id);e.src=blobUrl(e.getAttribute('data-b64'));e.removeAttribute('data-b64')});


var names=["Anurag University","University of Hyderabad","JNTUH","Osmania University","BVRIT","Malla Reddy Group (MLRIT)","Bhoj Reddy Engineering College","KMIT","GRIET","VNR VJIET"];
document.getElementById('cl').innerHTML=names.map(function(n,i){return '<li><span class="n">'+String(i+1).padStart(2,'0')+'</span><span>'+n+'</span><span class="t">They ate 🔥</span></li>'}).join('');
var chips=names.map(function(n){return '<span class="chip">'+n+'</span>'}).join('');
document.getElementById('mq').innerHTML=chips+chips;

function L(a){return '<ul>'+a.map(function(x){return '<li>'+x+'</li>'}).join('')+'</ul>'}
function S(h){var r='<h3>'+h+'</h3>';for(var i=1;i<arguments.length;i++){var x=arguments[i];r+=Array.isArray(x)?L(x):'<p>'+x+'</p>'}return r}
var CB='<div class="cb"><b>StudentDays.co</b><a href="mailto:hello@studentdays.co.in">Email: hello@studentdays.co.in</a><span>Website: www.studentdays.co.in</span></div><p class="tgl">Travel. Connect. Experience.<br>Every Trip Becomes a Story.</p>';
function QA(q,a){return '<details class="faq"><summary>'+q+'</summary>'+(Array.isArray(a)?L(a):'<p>'+a+'</p>')+'</details>'}
var TERMS='<p class="upd">Last updated: June 2026</p><p>Welcome to StudentDays.co. By accessing our website, registering for trips, events, or services, you agree to comply with the following Terms &amp; Conditions. Please read them carefully before making any booking.</p>'+
S('1. Acceptance of terms','By using StudentDays.co, you acknowledge that you have read, understood, and agreed to these Terms &amp; Conditions. If you do not agree, please refrain from using our services.')+
S('2. Eligibility',['StudentDays.co experiences are primarily designed for students and young adults.','Participants must provide accurate information during registration.','Participants under 18 years of age may require parental or guardian consent.'])+
S('3. Bookings &amp; registrations',['All bookings are subject to availability.','A booking is confirmed only after successful payment and confirmation from StudentDays.co.','StudentDays.co reserves the right to reject or cancel any registration if necessary.'])+
S('4. Payments',['Trip and event fees must be paid through approved payment methods.','Prices displayed on the website are subject to change without prior notice.','Any applicable taxes, convenience fees, or third-party charges may be added during checkout.'])+
S('5. Participant responsibilities','Participants are expected to:',['Follow trip coordinators\' instructions.','Respect fellow travelers and organizers.','Maintain appropriate behavior during trips and events.','Comply with local laws and regulations.'],'StudentDays.co reserves the right to remove any participant whose behavior is disruptive, unsafe, or harmful to others.')+
S('6. Travel &amp; event changes','StudentDays.co may modify:',['Itineraries','Schedules','Accommodation arrangements','Transportation plans'],'Such changes may occur due to weather conditions, operational requirements, safety concerns, government regulations, or unforeseen circumstances.')+
S('7. Cancellation by participant','Cancellation and refund policies may vary depending on the trip or event. Please refer to the Refund &amp; Cancellation Policy page for complete details.')+
S('8. Cancellation by StudentDays.co','StudentDays.co reserves the right to cancel or postpone any trip or event due to:',['Insufficient registrations','Natural disasters','Government restrictions','Safety concerns','Unforeseen operational issues'],'In such cases, participants will be informed and eligible compensation or refunds will be handled according to the Refund Policy.')+
S('9. Liability disclaimer','StudentDays.co acts as an organizer and facilitator of experiences. While every effort is made to ensure safety and quality, StudentDays.co shall not be held responsible for:',['Personal injuries','Loss of belongings','Accidents','Delays','Third-party service failures','Natural disasters','Circumstances beyond our reasonable control'],'Participants join trips and events at their own risk.')+
S('10. Photography &amp; media consent','By participating in StudentDays.co trips or events, you grant permission for photographs, videos, and other media captured during the experience to be used for:',['Marketing','Social media promotions','Website content','Future promotional campaigns'],'The StudentDays team captures moments throughout the whole trip, and you may be recorded during the journey and sightseeing.','If you wish to opt out, please notify the organizing team before the event begins.')+
S('11. Intellectual property','All website content, branding, logos, graphics, videos, and materials are the property of StudentDays.co and may not be copied, reproduced, or distributed without written permission.')+
S('12. Prohibited activities','Users must not:',['Provide false information','Misuse the platform','Engage in unlawful activities','Harass participants or organizers','Damage property during trips or events'],'Violation may result in immediate removal from services without refund.')+
S('13. Privacy','Your use of StudentDays.co is also governed by our Privacy Policy, which explains how we collect, use, and protect your information.')+
S('14. Changes to terms','StudentDays.co reserves the right to update these Terms &amp; Conditions at any time. Updated versions will be posted on this page.')+
S('15. Contact us','For any questions regarding these Terms &amp; Conditions, please contact:')+CB;
var PRIV='<p class="upd">Last updated: June 2026</p><p>At StudentDays.co, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, store, and protect your information when you visit our website, register for trips, participate in events, or interact with our services.</p><p>By using StudentDays.co, you agree to the practices described in this Privacy Policy.</p>'+
S('1. Information we collect','<b>Personal information</b>',['Full name','Email address','Phone number','College/University name','City and state','Emergency contact information','Date of birth (if required for specific trips)'],'<b>Booking information</b>',['Trip registrations','Event registrations','Payment details (processed through secure third-party payment providers)'],'<b>Technical information</b>',['Device information','Browser type','IP address','Website usage data','Cookies and analytics data'])+
S('2. How we use your information','We use your information to:',['Process trip and event registrations','Communicate important updates','Provide customer support','Improve website functionality','Personalize user experience','Send trip announcements, offers, and updates','Maintain safety and security during experiences','Comply with legal requirements'])+
S('3. Information sharing','StudentDays.co does not sell, rent, or trade your personal information. We may share information only with:',['Trip partners and service providers','Transportation providers','Accommodation partners','Payment processing providers','Government authorities when legally required'],'All partners are expected to maintain appropriate data protection standards.')+
S('4. Cookies &amp; analytics','Our website may use cookies and analytics tools to:',['Improve website performance','Understand visitor behavior','Enhance user experience','Measure marketing effectiveness'],'You may disable cookies through your browser settings, although some features may not function properly.')+
S('5. Data security','We implement reasonable security measures to protect your personal information from:',['Unauthorized access','Misuse','Disclosure','Alteration','Loss'],'While we strive to protect your information, no online system can guarantee complete security.')+
S('6. Communications','By registering on StudentDays.co, you may receive:',['Trip updates','Booking confirmations','Event notifications','Community announcements','Promotional offers'],'You may unsubscribe from marketing communications at any time.')+
S('7. Media &amp; photography','During trips, events, and experiences, photos and videos may be captured for promotional purposes. These materials may be used on:',['StudentDays.co website','Social media platforms','Marketing campaigns','Promotional content'],'If you do not wish to appear in such content, please notify the organizing team before the event begins.')+
S('8. Third-party links','Our website may contain links to third-party websites or services. StudentDays.co is not responsible for the privacy practices or content of external websites. Users are encouraged to review the privacy policies of those websites separately.')+
S('9. Children\'s privacy','StudentDays.co services are primarily intended for students and young adults. Where required, participants below the age of 18 should obtain consent from a parent or legal guardian before registering.')+
S('10. Changes to this privacy policy','We may update this Privacy Policy periodically to reflect changes in our services, legal requirements, or business practices. Any updates will be published on this page with the revised effective date.')+
S('11. Your rights','You may request to:',['Access your personal information','Correct inaccurate information','Update your details','Request deletion of your information where applicable'],'Requests can be submitted through our contact details below.')+
S('12. Contact us','For questions regarding this Privacy Policy or your personal information, please contact:')+CB+
S('Our commitment','Your trust is important to us. StudentDays.co is committed to creating safe, memorable, and meaningful experiences while protecting your privacy and personal information.');
var REF='<p class="upd">Last updated: June 2026</p><p>At StudentDays.co, we work closely with transportation providers, accommodation partners, activity organizers, and vendors to create memorable experiences for students. Since many arrangements are booked in advance, the following Refund &amp; Cancellation Policy applies to all trips and events.</p><p>By booking a trip or event with StudentDays.co, you agree to this policy.</p>'+
S('1. Cancellation by participant','If a participant chooses to cancel their booking, the following refund structure may apply:')+
'<div class="rt"><div><b>More than 15 days before departure</b><span>Up to 75% refund of the booking amount. Processing charges and third-party fees may be deducted.</span></div><div><b>8 to 14 days before departure</b><span>Up to 50% refund of the booking amount.</span></div><div><b>3 to 7 days before departure</b><span>Up to 25% refund of the booking amount.</span></div><div><b>Less than 72 hours before departure</b><span>No refund will be provided.</span></div><div><b>No show</b><span>No refund will be provided if the participant fails to attend the trip, event, or departure point.</span></div></div>'+
'<p class="kn2">Advance booking amounts are non-refundable but may be adjusted against future StudentDays.co trips at management discretion.</p>'+
S('2. Cancellation request process','To request a cancellation, send an email to hello@studentdays.co.in and include:',['Full name','Registered phone number','Trip/Event name','Booking details','Reason for cancellation'],'Refund requests will be processed only after verification.')+
S('3. Refund processing time',['Approved refunds will generally be processed within 7 to 15 business days.','Refund timelines may vary depending on the payment provider or banking institution.'])+
S('4. Transfer of booking','Where possible, StudentDays.co may allow booking transfers to another eligible participant. Approval is subject to:',['Availability','Verification of the replacement participant','Operational feasibility'],'Transfer requests must be made before the specified deadline communicated by the organizing team.')+
S('5. Cancellation by StudentDays.co','StudentDays.co reserves the right to cancel, postpone, or reschedule trips/events due to:',['Insufficient registrations','Extreme weather conditions','Government restrictions','Natural disasters','Safety concerns','Transport disruptions','Other unforeseen circumstances'],'In such cases, participants may receive:',['Full refund, or','Credit towards a future trip/event, depending on the situation.'],'The final decision will be communicated to all registered participants.')+
S('6. Non-refundable charges','The following may be non-refundable:',['Booking convenience fees','Payment gateway charges','Government taxes','Third-party reservation charges','Customized add-ons or special requests'])+
S('7. Participant removal during trip','StudentDays.co reserves the right to remove any participant whose behavior:',['Threatens safety','Violates local laws','Harasses others','Disrupts the experience'],'In such cases:',['No refund will be provided.','Additional expenses incurred may be charged to the participant.'])+
S('8. Force majeure','StudentDays.co shall not be held liable for cancellations, delays, or changes caused by circumstances beyond reasonable control, including:',['Natural disasters','Floods','Earthquakes','Political unrest','Government restrictions','Pandemic-related restrictions','Transportation strikes'],'Refunds in such situations will depend on recoveries from third-party vendors and service providers.')+
S('9. Contact us','For cancellation requests or refund-related queries:')+CB+
S('Our goal','We strive to keep our cancellation and refund process fair while ensuring the sustainability of student-friendly experiences. Thank you for being a part of the StudentDays.co community.');
var FAQH='<h3 class="fcat">Trip related questions</h3>'+
QA('How do I book a trip?','You can book a trip directly through our website by selecting your preferred trip and completing the registration and payment process.')+
QA('How will I know if my booking is confirmed?','Once your payment is successfully completed, you will receive a confirmation through WhatsApp, email, or a phone call from our team.')+
QA('What is included in the trip package?','Trip inclusions vary by destination. Generally, transportation, accommodation, trip coordination, planned activities, and sightseeing are included.')+
QA('What is not included in the trip cost?','Personal expenses, shopping, additional meals, travel insurance, and activities not listed in the itinerary.')+
QA('Can I join alone?','Yes. Many students join solo and make new friends during the trip.')+
QA('Will there be trip coordinators?','Yes. Every trip is managed by StudentDays.co coordinators.')+
QA('Do I need to arrange my own transportation?','Trip details will clearly mention whether transportation is included.')+
QA('Can I bring friends?','Yes, provided they complete the registration process.')+
QA('What should I carry for the trip?',['Valid ID proof','Comfortable clothes','Personal medicines','Charger / power bank','Water bottle','Personal essentials'])+
'<h3 class="fcat">Payments &amp; refunds</h3>'+
QA('What payment methods are accepted?','We accept secure online payments through approved payment gateways.')+
QA('Is the booking amount refundable?','Refund eligibility depends on the cancellation timeline. Please refer to the Refund &amp; Cancellation Policy.')+
QA('How long does a refund take?','Approved refunds are usually processed within 3 to 7 business days.')+
'<h3 class="fcat">Safety &amp; security</h3>'+
QA('Is StudentDays.co safe?','Yes. Safety is our top priority. Trips are carefully planned and managed by coordinators.')+
QA('Are female travelers welcome?','Absolutely. StudentDays.co promotes a safe, respectful, and inclusive environment for all participants.')+
QA('What should I do during an emergency?','Immediately contact the assigned trip coordinator. Emergency contact details are shared before departure.')+
'<h3 class="fcat">Community &amp; experiences</h3>'+
QA('Can I become a StudentDays Campus Ambassador?','Yes. Students can apply through our website or contact our team.')+
QA('Do you organize college-specific trips?','Yes. We collaborate with colleges, clubs, and student communities.')+
QA('Do you organize events apart from trips?','Yes. We conduct meetups, workshops, networking sessions, and student experiences.')+
'<h3 class="fcat">Contact &amp; support</h3>'+
QA('How can I contact StudentDays.co?','Email hello@studentdays.co.in or visit www.studentdays.co.in.')+
QA('How can I stay updated about upcoming trips?','Follow StudentDays.co on Instagram and regularly check our website for announcements.')+
'<p class="tgl">Travel. Connect. Experience.<br>Every Trip Becomes a Story.</p>';
var PAGES={faq:{t:'FAQs',s:'Frequently asked questions',h:FAQH},terms:{t:'Terms &amp; Conditions',s:'Please read these before making any booking.',h:TERMS},refund:{t:'Refund &amp; Cancellation Policy',s:'How cancellations and refunds work.',h:REF},privacy:{t:'Privacy Policy',s:'How we collect, use and protect your information.',h:PRIV}};
var foot=document.getElementById('policies');
Object.keys(PAGES).forEach(function(k){var p=PAGES[k],d=document.createElement('div');d.id=k;d.className='cp pol';d.hidden=true;
 d.innerHTML='<div class="wrap"><a class="glass back" href="#hero" data-go="home">← Back</a><div class="ctop"><h1>'+p.t+'</h1><p class="sub">'+p.s+'</p></div><div class="body">'+p.h+'</div></div>';
 foot.parentNode.insertBefore(d,foot)});
var VIDS=[{id:'4E648bz2aR4',tab:'1. Arunachalam & Pondicherry',sub:'Between Soul & Shore — Arunachalam & Pondicherry',ti:'Between Soul & Shore'},{id:'lN502PsnETI',tab:'2. Vizag & Araku',sub:'Beach, Chills & Hills — Vizag & Araku',ti:'Beach: Chills & Hills'}];
var pl=document.getElementById('player'),tabs=document.getElementById('dtabs'),ds=document.getElementById('dsub');
pl.insertAdjacentHTML('afterend','<p class="scr"><a class="glass" id="yt" target="_blank" rel="noopener">▶ Watch on YouTube</a></p>');
function vid(i){var v=VIDS[i];ds.textContent=v.sub;document.getElementById('yt').href='https://youtu.be/'+v.id;
 [].forEach.call(tabs.children,function(b,j){b.setAttribute('aria-selected',j===i)});
 pl.innerHTML='<button class="ph" type="button" aria-label="Play '+v.ti+'"><img alt="" src="https://i.ytimg.com/vi/'+v.id+'/hqdefault.jpg" onerror="this.remove()"><span class="pb2" style="position:relative">▶</span><span style="position:relative">'+v.ti+'</span><small style="position:relative">StudentDays Stories</small></button>';
 pl.firstChild.onclick=function(){pl.innerHTML='<iframe src="https://www.youtube-nocookie.com/embed/'+v.id+'?autoplay=1&rel=0" title="'+v.ti+'" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>'}}
VIDS.forEach(function(v,i){var b=document.createElement('button');b.className='tab';b.type='button';b.textContent=v.tab;b.onclick=function(){vid(i)};tabs.appendChild(b)});
vid(0);
var RV=[['Rahul Kumar','Anurag University','RK','Best trip of my college life.'],['Priya Sharma','GNU','PS','The documentary film made me relive everything.'],['N Varadarajulu','Rao Institute','NV','Never thought student travel could feel this good.']];
var rc=RV.map(function(r){return '<div class="rc"><div class="who2"><span class="av">'+r[2]+'</span><div><b>'+r[0]+'</b><small>'+r[1]+'</small></div></div><div class="st" aria-label="5 stars">★★★★★</div><p>“'+r[3]+'”</p></div>'}).join('');
document.getElementById('rv').innerHTML=rc+rc+rc+rc;
var pg={home:document.getElementById('home'),colleges:document.getElementById('colleges'),about:document.getElementById('about'),doc:document.getElementById('doc'),trips:document.getElementById('trips'),app:document.getElementById('app')};
Object.keys(PAGES).forEach(function(k){pg[k]=document.getElementById(k)});
var nav=document.getElementById('nav');
function show(n,a){for(var k in pg)pg[k].hidden=(k!==n);nav.classList.remove('open');setTimeout(updJt,60);
 if(n!=='home')window.scrollTo({top:0,behavior:'instant'});else{var el=a&&document.getElementById(a);if(el)el.scrollIntoView();else window.scrollTo({top:0,behavior:'instant'})}
 try{history.replaceState(null,'',n!=='home'?'#'+n:'#'+(a||'hero'))}catch(e){}}
document.addEventListener('click',function(e){var g=e.target.closest('[data-go]');if(g){e.preventDefault();show(g.dataset.go,g.dataset.anchor)}});
var nav=document.getElementById('nav'),mb=document.getElementById('mb');
mb.addEventListener('click',function(){var o=nav.classList.toggle('open');mb.setAttribute('aria-expanded',o)});
document.addEventListener('click',function(e){if(!nav.contains(e.target)&&nav.classList.contains('open')){nav.classList.remove('open');mb.setAttribute('aria-expanded',false)}});

var KH='<button type="button" class="x" id="kx" aria-label="Close">✕</button><div class="kh"><span class="hfb">HOUSEFULL</span><p class="kk">God\'s own country · A trip you\'ll never forget</p><h3>Kerala trip itinerary</h3><p class="kr">Munnar · Kolukkumalai · Alappuzha · Athirapally</p><div class="kc"><span>Pickup &amp; drop: Hyderabad</span><span>Only for college students (female &amp; male)</span></div></div>';
KH+='<div class="kbox kp"><b>All-inclusive package</b><strong>Rs. 7,999/-</strong><p>Train tickets · Stays · Houseboat night · All meals · Tent stay on the peak · Photos, videos &amp; a documentary shoot</p><small>* 5 days including travel days (train journey to and from Kochi).</small></div>';
function rows(a){return a.map(function(r){return '<div class="kr2"><em>'+r[0]+'</em><ul>'+r[1].map(function(x){return '<li>'+x+'</li>'}).join('')+'</ul></div>'}).join('')}
var DAYS=[
['Day 0','Start from Hyderabad','Relax and enjoy the train journey with your gang. Tickets included.',[],'',''],
['Day 1','Kochi to Munnar','Tea gardens, waterfalls &amp; misty hills',[['Morning',['Reach <b>Kochi</b> and meet your trip team','<b>Pickup from Kochi</b> and transfer to Munnar','En-route stop at <b>Cheeyapara Waterfalls</b>']],['Afternoon',['Arrival &amp; check-in at <b>Munnar</b>','Visit <b>Mattupetty Dam</b>','<b>Elephant Park</b> and <b>Photo Point</b>','Stroll through the <b>Botanical Garden</b>']],['Night',['Dinner &amp; overnight stay in Munnar']]],'Rest well tonight. Tomorrow starts at 3:00 AM for the sunrise of a lifetime!','Stay in Munnar: the whole resort is reserved for our group, with comfortable rooms, misty hill views and separate rooms for girls and boys.'],
['Day 2','Kolukkumalai to Alappuzha','Sunrise above the clouds, then the backwaters',[['3:00 AM',['Early wake-up','Depart for <b>Kolukkumalai</b>, one of the highest tea estates in the world']],['Morning',['Experience the spectacular <b>Kolukkumalai Sunrise</b>','Return from Kolukkumalai','Breakfast and freshen up']],['Afternoon',['Depart towards <b>Alappuzha</b>','Check in to your <b>Alappuzha Houseboat</b>','Relaxing <b>backwater cruise</b>','Enjoy Kerala-style scenery &amp; local experience']],['Night',['Dinner &amp; overnight stay on the <b>Houseboat</b>']]],'','Boat stay: a whole day and night afloat on your own houseboat, with breakfast, lunch and dinner served on board.'],
['Day 3','Alappuzha to Athirapally to Kochi','Thundering falls, then homeward bound',[['9:00 AM',['Breakfast','Houseboat checkout']],['Morning',['Transfer to <b>Athirapally</b>']],['Afternoon',['<b>Athirapally Waterfalls</b>, the Niagara of India','<b>Thumboormuzhy Dam</b>','<b>Butterfly Park</b>','<b>Hanging Bridge</b>']],['Evening',['Depart towards Kochi and reach Kochi']]],'Return to Hyderabad by train.','']
];
KH+=DAYS.map(function(d){return '<div class="kd1"><div class="kdh"><i>'+d[0]+'</i><div><b>'+d[1]+'</b><span>'+d[2]+'</span></div></div>'+rows(d[3])+(d[4]?'<div class="knote">'+d[4]+'</div>':'')+(d[5]?'<p class="kst">'+d[5]+'</p>':'')+'</div>'}).join('');
KH+='<div class="kro">'+['Hyderabad','Kochi','Munnar','Kolukkumalai','Alappuzha','Athirapally','Kochi','Hyderabad'].map(function(x){return '<span>'+x+'</span>'}).join('')+'</div>';
KH+='<div class="kbox" style="text-align:left"><b style="text-align:center">What\'s included</b><div class="kin">'+[['Train tickets','Hyderabad to Kochi and back'],['Local transport','All pickups, transfers &amp; sightseeing travel in Kerala'],['Comfortable stays','Hand-picked stays during the trip'],['Houseboat stay','A full night floating on the Alappuzha backwaters'],['Food on the boat','Kerala-style breakfast, lunch &amp; dinner on board'],['Tent stay on the peak','Camp at the Kolukkumalai peak point'],['Photos &amp; videos','Camera coverage so every moment is captured'],['Documentary shoot','Your trip turned into a keepsake documentary'],['Trip guide &amp; support','A guide and support team with you throughout']].map(function(x){return '<div><b>'+x[0]+'</b>'+x[1]+'</div>'}).join('')+'</div><p class="kn" style="margin:12px 0 0">* Except food on trains. Lunch on one day is not included. Just about Rs. 1,600 per day for travel, stay, food, adventure and memories.</p></div>';
KH+='<div class="kact"><a class="glass blue" href="https://forms.gle/zBD1r477KBZxSiDF6" target="_blank" rel="noopener">Pre-booking form</a><button class="glass" type="button" id="kx2">Close</button></div>';
var kd=document.getElementById('kd');document.getElementById('kdb').innerHTML=KH;
function kopen(){if(kd.open)return;if(kd.showModal)kd.showModal();else kd.setAttribute('open','')}
var kc=document.getElementById('kcard');kc.addEventListener('click',kopen);kc.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();kopen()}});
document.getElementById('kx').addEventListener('click',function(){kd.close()});document.getElementById('kx2').addEventListener('click',function(){kd.close()});
kd.addEventListener('click',function(e){if(e.target===kd)kd.close()});
var busy=false;
function fly(btn,mid){
 if(busy)return;busy=true;
 if(matchMedia('(prefers-reduced-motion: reduce)').matches){mid();busy=false;return}
 var W=innerWidth,H=innerHeight,r=btn.getBoundingClientRect(),x0=r.left+r.width/2,y0=r.top+r.height/2,
 c=document.getElementById('fx'),ctx=c.getContext('2d'),pl=document.getElementById('plane'),dpr=Math.min(2,window.devicePixelRatio||1);
 c.width=W*dpr;c.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);c.style.display='block';
 var P=y0>H*.5?[[x0,y0],[x0+W*.05,y0-H*.5],[W*.5,H*.05],[W*1.2,-H*.2]]:[[x0,y0],[x0+W*.28,y0+H*.30],[W*.5,H*.02],[W*1.18,-H*.12]];
 function B(t){var u=1-t;return [u*u*u*P[0][0]+3*u*u*t*P[1][0]+3*u*t*t*P[2][0]+t*t*t*P[3][0],u*u*u*P[0][1]+3*u*u*t*P[1][1]+3*u*t*t*P[2][1]+t*t*t*P[3][1]]}
 function D(t){var u=1-t;return [3*u*u*(P[1][0]-P[0][0])+6*u*t*(P[2][0]-P[1][0])+3*t*t*(P[3][0]-P[2][0]),3*u*u*(P[1][1]-P[0][1])+6*u*t*(P[2][1]-P[1][1])+3*t*t*(P[3][1]-P[2][1])]}
 var DUR=2600,t0=performance.now(),pts=[],did=false;
 function ease(t){return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2}
 function frame(now){
  var k=Math.min(1,(now-t0)/DUR),e=ease(k),p=B(e),d=D(e),a=Math.atan2(d[1],d[0]);
  pts.push(p);if(pts.length>70)pts.shift();
  ctx.clearRect(0,0,W,H);ctx.lineCap='round';
  for(var i=1;i<pts.length;i++){var f=i/pts.length;ctx.strokeStyle='rgba(255,255,255,'+(f*.85)+')';ctx.lineWidth=.6+f*2.2;ctx.beginPath();ctx.moveTo(pts[i-1][0],pts[i-1][1]);ctx.lineTo(pts[i][0],pts[i][1]);ctx.stroke()}
  var s=.55+Math.sin(Math.PI*e)*.7,op=Math.min(1,k/.06)*(k>.86?Math.max(0,(1-k)/.14):1);
  pl.style.opacity=op;pl.style.transform='translate('+(p[0]-32)+'px,'+(p[1]-32)+'px) rotate('+a+'rad) scale('+s+')';
  if(!did&&k>.55){did=true;mid()}
  if(k<1)requestAnimationFrame(frame);else{pl.style.opacity=0;c.style.display='none';busy=false}
 }
 requestAnimationFrame(frame)}
document.addEventListener('click',function(e){var g=e.target.closest('[data-trip]');if(!g)return;e.preventDefault();nav.classList.remove('open');fly(g,function(){show('trips')})});

(function(){var tg=document.querySelector('.tg');
[].slice.call(tg.children).forEach(function(c){var n=c.cloneNode(true);n.removeAttribute('id');n.setAttribute('aria-hidden','true');n.tabIndex=-1;tg.appendChild(n)});
document.getElementById('trips').addEventListener('click',function(e){if(e.target.closest('.kcard'))kopen()});
if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
var paused=false,rt,pos=0,tr=document.getElementById('trips');
function hold(ms){paused=true;clearTimeout(rt);rt=setTimeout(function(){paused=false},ms)}
['pointerdown','wheel','touchstart','touchmove','mouseenter'].forEach(function(ev){tg.addEventListener(ev,function(){hold(2500)},{passive:true})});
tg.addEventListener('mouseleave',function(){hold(500)});
function step(){if(!paused&&!tr.hidden){var half=tg.children[3].offsetLeft-tg.children[0].offsetLeft;if(half>0){if(Math.abs(tg.scrollLeft-pos)>2)pos=tg.scrollLeft;pos+=.7;if(pos>=half)pos-=half;tg.scrollLeft=pos}}requestAnimationFrame(step)}
requestAnimationFrame(step)})();

var jt=document.querySelector('.jt'),hb=document.querySelector('#hero [data-trip]');
function updJt(){var home=!pg.home.hidden,on=document.body.classList.contains('ready')&&(!home||hb.getBoundingClientRect().bottom<40);jt.classList.toggle('on',on)}
addEventListener('scroll',updJt,{passive:true});addEventListener('resize',updJt);
new MutationObserver(updJt).observe(document.body,{attributes:true,attributeFilter:['class']});
updJt();

(function(){
// Paste your Google Apps Script web app URL here to send Create Trip forms to your Google Sheet
var SHEET_URL='https://script.google.com/macros/s/AKfycbwvMQxwC7YnpiBdW9usDjbHZYcN2h2mq2MCiBHDlvlYurJ_7Z7sbKstlJ3nnbCe2CSFOg/exec';
var cd=document.getElementById('cd'),cf=document.getElementById('cf'),crew=[].slice.call(document.querySelectorAll('#crew i')),md=document.getElementById('mood'),cm=document.getElementById('capmsg'),wa=document.getElementById('cwa'),cur=-1,sent=false;
var bg=document.querySelector('.rbg.b');if(bg)cd.style.backgroundImage='linear-gradient(rgba(3,10,26,.3),rgba(3,10,26,.62)),'+bg.style.backgroundImage;
var FACES=['😐','🙂','😊','😄','🤩'],CAP=['Your crew is waiting…','Nice start!','Looking good!','They are getting excited!','Extremely excited!!'];
function setMood(l,txt,face){if(l===cur&&!txt)return;cur=l;crew.forEach(function(el,i){el.textContent=face||FACES[l];el.classList.remove('b','j');void el.offsetWidth;el.style.animationDelay=(i*70)+'ms';el.classList.add(txt?'j':'b')});md.textContent=txt||CAP[l]}
function score(){var f=cf.elements,n=0;if(f.planner.value.trim().length>1)n++;if(f.contact.value.trim().length>=8)n++;if(f.college.value.trim())n++;if(+f.cap.value>=10)n++;if(f.male.value!=='')n++;if(f.female.value!=='')n++;if(f.dest.value.trim())n++;if(f.travel.value)n++;return n}
function upd(){var f=cf.elements;cm.hidden=!(f.cap.value!==''&&+f.cap.value<10);var n=score();setMood(n?Math.min(4,Math.ceil(n/2)):0)}
cf.addEventListener('input',upd);cf.addEventListener('change',upd);
function open(){if(sent){cf.reset();sent=false;wa.hidden=true}cur=-1;upd();if(cd.showModal)cd.showModal();else cd.setAttribute('open','')}
document.getElementById('ctb').addEventListener('click',open);
document.getElementById('cx').addEventListener('click',function(){cd.close()});
cd.addEventListener('click',function(e){if(e.target===cd)cd.close()});
function confetti(){var cs=['#FFD23F','#1E6BFF','#2ECC71','#fff','#ff5a7a'],box=document.getElementById('cdi');for(var i=0;i<46;i++){var s=document.createElement('span');s.className='cfp';s.style.left=(Math.random()*100)+'%';s.style.background=cs[i%5];s.style.animationDelay=(Math.random()*.5)+'s';box.appendChild(s);(function(x){setTimeout(function(){x.remove()},2700)})(s)}}
cf.addEventListener('submit',function(e){e.preventDefault();var f=cf.elements;
 if(+f.cap.value<10||f.cap.value===''){cm.hidden=false;f.cap.focus();return}
 if(!cf.checkValidity&&false)return;
 var miss=['planner','contact','college','male','female','dest','travel'].filter(function(k){return !String(f[k].value).trim()});
 if(miss.length){f[miss[0]].focus();setMood(Math.min(4,Math.ceil(score()/2)));md.textContent='Please fill every field to continue';return}
 var txt='Create Trip request (College/Group)\n\nTrip planner: '+f.planner.value+'\nContact: '+f.contact.value+'\nCollege & year: '+f.college.value+'\nGroup capacity: '+f.cap.value+'\nMales: '+f.male.value+'\nFemales: '+f.female.value+'\nDestinations: '+f.dest.value+'\nPreferred travel: '+f.travel.value;
 var url='https://wa.me/919640389230?text='+encodeURIComponent(txt);
 if(SHEET_URL){try{fetch(SHEET_URL,{method:'POST',mode:'no-cors',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify({planner:f.planner.value,contact:f.contact.value,college:f.college.value,cap:f.cap.value,male:f.male.value,female:f.female.value,dest:f.dest.value,travel:f.travel.value})}).catch(function(){})}catch(err){}}
 sent=true;setMood(5,'Cheers! 🥂 Opening WhatsApp…','🥳');confetti();wa.href=url;wa.hidden=false;
 setTimeout(function(){window.open(url,'_blank')},1500)});
})();

(function(){
var sl=document.getElementById('aps');
var srcs=[].slice.call(document.querySelectorAll('.wall img')).map(function(i){return 'url("'+i.src+'")'});
var bg=document.querySelector('.rbg.b');if(bg)srcs.unshift(bg.style.backgroundImage);
srcs.forEach(function(s,i){var d=document.createElement('div');d.className='sl';d.style.backgroundImage=s;d.style.animationDelay=(i*4)+'s';d.style.animationDuration=(srcs.length*4)+'s';sl.appendChild(d)});
var ad=document.getElementById('ad'),af=document.getElementById('af'),fm=document.getElementById('aform'),th=document.getElementById('athx'),wa=document.getElementById('awa'),done=false;
function open(){if(done){af.reset();done=false;fm.hidden=false;th.hidden=true;ad.classList.remove('done')}if(ad.showModal)ad.showModal();else ad.setAttribute('open','')}
document.getElementById('atb').addEventListener('click',open);
document.getElementById('ax').addEventListener('click',function(){ad.close()});
ad.addEventListener('click',function(e){if(e.target===ad)ad.close()});
function confetti(){var cs=['#FFD23F','#1E6BFF','#2ECC71','#fff','#ff5a7a'],box=document.querySelector('.fcard');for(var i=0;i<44;i++){var s=document.createElement('span');s.className='cfp';s.style.left=(Math.random()*100)+'%';s.style.background=cs[i%5];s.style.animationDelay=(Math.random()*.5)+'s';box.appendChild(s);(function(x){setTimeout(function(){x.remove()},2700)})(s)}}
af.addEventListener('submit',function(e){e.preventDefault();var f=af.elements;
 var txt='App early access request\n\nName: '+f.nm.value+'\nAge: '+f.age.value+'\nCollege: '+f.col.value+'\nGender: '+f.gen.value+'\nMobile: '+f.mob.value;
 var url='https://wa.me/919640389230?text='+encodeURIComponent(txt);
 done=true;fm.hidden=true;th.hidden=false;ad.classList.add('done');wa.href=url;confetti();
 setTimeout(function(){window.open(url,'_blank')},1500)});
})();

(function(){var ap=document.getElementById('app'),av=document.getElementById('av');
function sync(){if(ap.hidden){av.pause()}else{var p=av.play();if(p&&p.catch)p.catch(function(){})}}
new MutationObserver(sync).observe(ap,{attributes:true,attributeFilter:['hidden']});})();

(function(){var v1=document.getElementById('wv1'),v2=document.getElementById('wv2'),av=document.getElementById('av');
v1.src=av.src;
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){var v=e.target;if(e.isIntersecting){var p=v.play();if(p&&p.catch)p.catch(function(){})}else v.pause()})},{threshold:.3});io.observe(v1);io.observe(v2)}
else{v1.play();v2.play()}})();
var pd=document.getElementById('pd'),pf=document.getElementById('pf'),pt=document.getElementById('pt'),po=document.getElementById('po');
document.getElementById('pw').addEventListener('click',function(e){e.preventDefault();nav.classList.remove('open');mb.setAttribute('aria-expanded',false);if(pd.showModal)pd.showModal();else pd.setAttribute('open','')});
document.getElementById('cpb').addEventListener('click',function(){if(pd.open)return;if(pd.showModal)pd.showModal();else pd.setAttribute('open','')});
document.getElementById('px').addEventListener('click',function(){pd.close()});
pd.addEventListener('click',function(e){if(e.target===pd)pd.close()});
pt.addEventListener('change',function(){po.hidden=pt.value!=='Others'});
pf.addEventListener('submit',function(e){e.preventDefault();var f=new FormData(pf),m=e.submitter&&e.submitter.dataset.m;
 var txt='Partnership enquiry\n\nName: '+f.get('name')+'\nContact: '+f.get('contact')+'\nPartnership type: '+f.get('type')+(f.get('type')==='Others'?'\nThoughts: '+f.get('others'):'')+'\nPage: '+f.get('page')+'\nReference: '+f.get('ref')+'\nAbout: '+f.get('about');
 location.href='mailto:hello@studentdays.co.in?subject='+encodeURIComponent('Partnership enquiry')+'&body='+encodeURIComponent(txt.replace(/\n/g,'\r\n'));
 pd.close()});
var h=location.hash.slice(1);if(pg[h]&&h!=='home')show(h);
})();
