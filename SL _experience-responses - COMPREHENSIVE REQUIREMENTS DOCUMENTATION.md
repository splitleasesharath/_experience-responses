COMPREHENSIVE REQUIREMENTS DOCUMENTATION  
\_experience-responses PAGE  
Split Lease Application \- Bubble.io No-Code Migration

PAGE OVERVIEW  
Page Name: \_experience-responses  
App: Split Lease (Production)  
Purpose: Display and filter survey responses from users (Guests and Hosts) regarding their experience with the Split Lease service  
Version: Live

FUNCTIONAL OVERVIEW  
The \_experience-responses page displays a list of experience survey responses collected from Split Lease users. The page allows filtering responses by user type (Guest/Host) and includes a search/name filter capability. Survey responses include 11 questions about the user experience.

PAGE LAYOUT STRUCTURE

Header Section:  
\- ⛴\_Corporate Header A (Floating Group): Contains navigation bar with Split Lease logo, navigation links (Corporate Pages, Unit Tests), Change Prices button, and user profile  
\- Fixed width: 1440x129px  
\- Position: Top left (0, 0\)

Main Content Area:  
\- Title: "Experience Survey Responses" (Heading)  
\- Number of Responses counter  
\- Search/Filter section  
\- List of surveys (repeating group)  
\- Detailed survey response display

DETAILED ELEMENT SPECIFICATIONS

1\. CORPORATE HEADER A (Floating Group)  
Element Type: Floating Group (Reusable Element)  
Dimensions: W: 1440, H: 129  
Floating at: Top, Left position  
Content: Navigation bar with branding

2\. PAGE TITLE  
Element Type: Text  
Name: Header text  
Content: Experience Survey Responses

3\. NUMBER OF RESPONSES COUNTER  
Element Type: Dynamic text  
Updates based on filtered data  
Formula: Count of items in survey repeating group

4\. SEARCH INPUT  
Element Type: Text Input  
Name: IN: Enter Name  
Functionality: Filters surveys by name  
Conditionals: Blue border when focused, red when invalid  
Border color when focused: \#52A8EC (blue)  
Border color when invalid: \#FF0000 (red)  
Boxshadow blur: 6px

5\. USER TYPE FILTER GROUP  
Element Type: Group with checkboxes  
Name: G: User Type  
Filter options: Guest, Host  
Both default to checked (true)  
Has custom state: list\_of\_types

Guest Checkbox:  
\- Name: C: Guest  
\- Defaults: Checked  
\- Workflow: Updates filter when changed

Host Checkbox:  
\- Name: C: Host  
\- Defaults: Checked  
\- Workflow: Updates filter when changed

6\. SURVEY LIST  
Element Type: Repeating Group  
Name: RG: Search Experience Surveys  
Data source: Experience Surveys from backend API  
Filters applied:  
  \- Name contains user search input  
  \- Type in selected user types (Guest/Host)  
Layout: Single column, vertical stack  
Each item shows: Name and Date

7\. SURVEY DETAIL PANEL  
Element Type: Group  
Displays full survey response for selected survey  
Contains 11 text display fields:  
  Q1: Respondent name  
  Q2: Experience description  
  Q3: Prior challenges  
  Q4: Emotional response to challenges  
  Q5: Changes experienced  
  Q6: Memorable service aspects  
  Q7: Desired additional services  
  Q8: Permission to share review  
  Q9: Recommendation likelihood (numeric)  
  Q10: Staff appreciation  
  Q11: Follow-up questions

PAGE WORKFLOWS SUMMARY

1\. CUSTOM EVENTS: 2 alert testing workflows  
2\. CLICK EVENTS: Survey item click opens detail panel  
3\. PAGE LOAD: Initialize state and hide Crisp chat  
4\. STATE MANAGEMENT: 2 checkbox change workflows

KEY DATA FIELDS

Experience Survey Object fields:  
\- Name: Respondent name  
\- Type: User type (Guest or Host)  
\- Experience: User experience description  
\- Challenge: Prior challenges faced  
\- Challenge Experience: Emotional response  
\- Change: Changes after using service  
\- Service: Memorable aspects  
\- Additional Service: Desired features  
\- Share: Public sharing permission  
\- Recommend: Likelihood score  
\- Split Lease Staff: Staff appreciation  
\- Questions: Follow-up questions

DATA FILTERING & SEARCH

RG: Search Experience Surveys filters:  
\- Text search: IN: Enter Name (contains match)  
\- Type filter: G: User Type list\_of\_types state  
\- Combined: Name AND Type filters

UNKNOWN/UNCLEAR SPECIFICATIONS

The following aspects require clarification:

1\. Search Expression Details  
   \- Exact search logic (case-insensitive, partial match?)  
   \- Whether search applies to respondent name or other fields  
   \- Performance implications of live search

2\. Data Source Details  
   \- Backend API: Search for Experience Surveys  
   \- Database table structure  
   \- Sort order of results  
   \- Pagination strategy (if any)

3\. Empty State Handling  
   \- What displays when no surveys match filters?  
   \- Error messages or default content?

4\. Mobile Responsiveness  
   \- Breakpoints for responsive behavior  
   \- Layout changes on smaller screens

5\. Conditional Logic Details  
   \- Full conditions for checkbox workflows  
   \- How list\_of\_types state is built  
   \- Step conditions beyond description

6\. Initial Data Load  
   \- Are surveys loaded on page init or on demand?  
   \- Any data caching mechanism?

NEXT STEPS FOR COMPLETE MIGRATION

To fully migrate to code:

1\. Extract repeating group data source SQL  
2\. Document all API endpoint details  
3\. Map Bubble conditionals to code logic  
4\. Define state management in target framework  
5\. Create component structure for React/Vue  
6\. Implement search/filter logic  
7\. Style with CSS based on Bubble styles  
8\. Test all workflows

