---
date: '2026-05-26 13:39:29'
draft: false
layout: single-iqss
section: technology
source_url: https://www.iq.harvard.edu/client-support-services/kvm-access-servers
title: KVM Access to Servers
---

<main aria-label="KVM Access to Servers" aria-labelledby="page-title" id="main-content" lang="en" role="main" tabindex="-1">
<div class="layout-content">
<div>
<div class="hidden" data-drupal-messages-fallback=""></div>
<article class="node node--type-hwp-page node--view-mode-full" lang="en">
<div class="hwp-page-title hwp-bg-light-base">
<div class="hwp-container hwp-container-px hwp-py-32">
<h1 class="text-large" id="page-title">
<span>KVM Access to Servers</span>
</h1>
</div>
</div>
<div class="hwp-container hwp-w-full hwp-py-32 lg:hwp-py-64 hwp-container-px lg:hwp-flex lg:hwp-gap-24">
<div class="lg:hwp-flex-initial lg:hwp-w-[19.375rem] hwp-pb-32 hwp-shrink-0">

</div>
<div class="hwp-flex hwp-flex-col hwp-flex-1 hwp-overflow-hidden hwp-content--narrow">
<div class="hwp-mb-16 hwp-container-px">
<div class="hwp-text-block field field--name-field-hwp-body field--type-text-long field--label-hidden">Remotely via a web browser -- This is only working with older version of the Java JRE (&lt;=1.6.0.10 on Windows and &lt;=1.6.0.7 on Linux) as of 2009-05-14.<br/><br/>    Open a web browser and navigate to <a href="https://dsview.hmdc.harvard.edu/">https://dsview.hmdc.harvard.edu/</a> .<br/>    Log in using your LDAP username and password.<br/>    DSView should load the interface with the "Units" tab selected, the "Units" sub-tab selected, and the "Unit Views" -&gt; "Appliances" -&gt; "All" subtree expanded in the sidebar, with the accessible appliances displayed to the right.<br/>    Click the arrow next to the KVM server which contains the console you want to connect to to display the name of the console. Alternately, type the name of the console in the "Filter" text field and press Enter (or click "Filter") to display only the relevant consoles.<br/>    Under the "Action" column, click "KVM Session" for the console you want to connect to.<br/>        Note: The first time you attempt to establish a KVM session from Windows, DSView will prompt you to install the Session Viewer applet. Follow the instructions to download the installer file, run it, restart your browser, then return to DSView to establish a KVM sesion.<br/>    A Java applet window will open and launch a KVM console session.<br/>        Note: The viewer is not officially supported by Avocent under Mac OS<br/>    The viewer applet should execute and establish a connection.<br/>        Note: the mouse may not follow the cursor if mouse acceleration is configured on the server. For instructions on how to disable mouse acceleration on the server, reference the Mouse and Pointer Settings Technical Brief, or the "Installation" chapter of the DSR Switch Installer/User Guide.<br/>    To disconnect, close the viewer or select "Exit" from the "File" meanu at the top of the viewer. The menu at the top of the viewer may auto-hide if it is not pointed at.<br/>    To log out, go to the main browser window and click "Logout".<br/><br/>Note: The supported video input resolutions and refresh rates for the KVM switch are:<br/><br/>    640 x 480 @ 60 Hz (Local Port and Remote Port Minimum)<br/>    800 x 600 @ 75 Hz<br/>    960 x 700 @ 75 Hz<br/>    1024 x 768 @ 75 Hz<br/>    1280 x 1024 @ 75 Hz (Remote Port Maximum using a DSRIQ module)</div>
</div>
</div>
</div>
</article>
</div>
</div>
</main>
