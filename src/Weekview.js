import React, { useState, useEffect, useRef } from "react";
import "./Weekview.scss";
// import * as Constants from "../../components/Constants";
// import APIService from "../../services/apiService";
// import "../../styles/LeaveManagement.scss";
// import Avatar from "views/RecruitmentFunnel/Avatar";

// import { alertService } from "services/alertService";
// import { formatDate } from "views/AttendanceLog_Old/utilityFunctions";



export default function WeekView({ ...props }) {


    //   const location = useLocation();
    //   let id = location.pathname.replace('/leaves/', '');
    const domContent = useRef(null);

    //   let userDetails = getUser();
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];

    // const [scrollInProgress, setScrollInProgress] = useState(false);

    const [leaves, setLeaves] = useState([]);  //used in getLeaves() to update actual leaves fetched̃
    // const [isSettingsPanelOpen, setIsSettingsPanelOpen] = useState(false);
    // const [holiday, setHoliday] = useState([]);
    // const [scrollDirection, setScrollDirection] = useState();


    // const [leaveFetchInProgress, setLeaveFetchInProgress] = useState(false);
    let newWeekDays = [];

    // const [scrollRightDates, setScrollRightDates] = useState({
    //   currentStartDate: '',
    //   currentEndDate: ''
    // });

    // const [scrollLeftDates, setScrollLeftDates] = useState({
    //   currentStartDate: '',
    //   currentEndDate: ''
    // });

    // let currentStartDate, currentEndDate;

    const [year, setYearState] = useState({ newYear: new Date().getFullYear(), month: new Date().getMonth() });



    function formatDate(inputDate) {

        let month = (+inputDate.getMonth() + 1 < 10 ? ('0' + (+inputDate.getMonth() + 1)) : (+inputDate.getMonth() + 1));
        let date = (+inputDate.getDate() < 10 ? ('0' + (inputDate.getDate())) : (inputDate.getDate()));
        inputDate = inputDate.getFullYear() + '-' + month + '-' + date;
        return inputDate;

    }
    function getLeaves(isScrollRight, startDay, endDay, leaveType, statusType, department = '') {

        loopDate = startDay;
        loopEndDate = endDay;
        startDay = formatDate(startDay);
        endDay = formatDate(endDay);

        // const apiPayLoad = null;
        // const leaveQuery = leaveType && leaveType !== 'All' ? `&leave_type_id=${leaveType}` : "";
        // const statusQuery = statusType ? `&status=${statusType}` : `&status=approved`;
        // const departmentType = department ? `&department_id=${department}` : '';

        // setLeaveFetchInProgress(true)

        startDay = startDay ? `start_date=${startDay}` : `start_date=''`;
        endDay = endDay ? `end_date=${endDay}` : `end_date=''`;

        while (loopDate <= loopEndDate) {

            newWeekDays.push({
                dayName: loopDate.toLocaleString("default", { weekday: "long" }),
                dayNo: loopDate.getDate(),
                actualDate: formatDate(loopDate),
                date: new Date(loopDate),  //unformatted date
                isToday: formatDate(loopDate) === today
            });

            let newDate = loopDate.setDate(loopDate.getDate() + 1);
            loopDate = new Date(newDate);
        }

        // if (isScrollRight === true) {
        //   setLeaves([...leaves, ...newWeekDays])
        // }
        // else if (isScrollRight === false) {
        //   setLeaves([...newWeekDays, ...leaves])
        // }
        // else 
        setLeaves([...newWeekDays]);

        // APIService.apiRequest(
        //   Constants.API_BASE_URL + "/leave" + "?" + startDay + "&" + endDay + statusQuery.toLowerCase() + leaveQuery + departmentType, apiPayLoad, false, "GET" //eslint-disable-line
        // )
        //   .then((response) => {

        // setLeaveFetchInProgress(false)
        //     if (response.status === 1) {
        //       if (response.leave_count) setLeaveCount(response.leave_count)
        // setHoliday(response.holiday)
        //       if (response.output) {
        // (isScrollRight === true) ? 
        // setOriginalLeavesData([...originalLeavesData, ...response.output]) : 
        // (isScrollRight === false) ? 
        // setOriginalLeavesData([...response.output, ...originalLeavesData]) : 
        //         setOriginalLeavesData(response.output);
        //         response.output.sort(function (a, b) {

        //           if (a.first_name < b.first_name) {
        //             return -1;
        //           }

        //           if (a.first_name > b.first_name) {
        //             return 1;
        //           }


        //           if (a.first_name === b.first_name) {

        //             if (a.last_name < b.last_name) {
        //               return -1;
        //             }

        //             if (a.last_name > b.last_name) {
        //               return 1;
        //             }

        //             if (a.last_name === b.last_name) {

        //               if (a.resource_id < b.resource_id) {
        //                 return -1;
        //               }

        //               if (a.resource_id > b.resource_id) {
        //                 return 1;
        //               }

        //             }

        //             return 0;
        //           }
        //           return 0;

        //         })

        //         newWeekDays.forEach((d) => {
        //           response.holiday.forEach((p) => {
        //             const holidayDate = new Date(p.date);
        //             if (+holidayDate.getMonth() === +d.date.getMonth() && +holidayDate.getDate() === +d.dayNo) {
        //               d.isPublicHoliday = true;
        //               d.holidayName = p.name;
        //             }
        //           })

        //           response.output.forEach((l) => {
        //             if (d.actualDate === l.start_date) {
        //               d.isHoliday = true;
        //               d.leaveName = l.leave_id;
        //               d.leave_type = l.leave_type;
        //               d.reason = l.reason ? l.reason : '';
        //               d.first_name = l.first_name;
        //               d.last_name = l.last_name;
        //               d.startDate = l.start_date;
        //               d.is_approved = l.is_approved;
        //               d.is_rejected = l.is_rejected;
        //               d.department = l.department;
        //               d.designation = l.designation;
        //               d.endDate = l.end_date ? l.end_date : '';
        //             }
        //           })
        //         });
        //       }
        //       else {
        //         setOriginalLeavesData([])
        //       }

        //       if (isScrollRight === true) {
        //         setLeaves([...leaves, ...newWeekDays])
        //       }
        //       else if (isScrollRight === false) {
        //         setLeaves([...newWeekDays, ...leaves])
        //       }
        //       else
        //         setLeaves([...newWeekDays]);

        //       setIsLoaded(true);
        //     }
        //     else {
        //       alertService.error(response.msg)
        //     }
        //   }).catch(err => {
        // setLeaveFetchInProgress(false)
        //     alertService.warning(err.msg)
        //   });
    }
    const getLastDayOfMonth = (year, month) => {
        return new Date(year, month + 1, 0);
    }

    const startDate = year ? new Date(year.newYear, year.month) : new Date();
    let endDate = getLastDayOfMonth(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
    const today = formatDate(new Date());

    let loopDate = new Date(startDate);
    let loopEndDate = endDate;

    // while (loopDate <=  loopEndDate ) {

    //   weekDays.push({
    //     dayName: loopDate.toLocaleString("default", { weekday: "long" }),
    //     dayNo: loopDate.getDate(),
    //     actualDate: formatDate(loopDate),
    //     date: new Date(loopDate),  //unformatted date
    //     isToday: formatDate(loopDate) === today
    //   });

    //   if(loopDate.getTime() === loopEndDate.getTime()){
    //     console.log(weekDays)
    // setWeeksViewData(weekDays);
    //   }
    //   let newDate = loopDate.setDate(loopDate.getDate() + 1);
    //   loopDate = new Date(newDate);
    // }

    // if (leaves) {

    //   leaves.sort(function (a, b) {

    //     if (a.first_name < b.first_name) {
    //       return -1;
    //     }

    //     if (a.first_name > b.first_name) {
    //       return 1;
    //     }


    //     if (a.first_name === b.first_name) {

    //       if (a.last_name < b.last_name) {
    //         return -1;
    //       }

    //       if (a.last_name > b.last_name) {
    //         return 1;
    //       }

    //       if (a.last_name === b.last_name) {

    //         if (a.resource_id < b.resource_id) {
    //           return -1;
    //         }

    //         if (a.resource_id > b.resource_id) {
    //           return 1;
    //         }

    //       }

    //       return 0;
    //     }
    //     return 0;

    //   })

    //   weekDays.forEach((d) => {
    //     holiday.forEach((p) => {
    //       const holidayDate = new Date(p.date);
    //       if (+holidayDate.getMonth() === +d.date.getMonth() && +holidayDate.getDate() === +d.dayNo) {
    //         d.isPublicHoliday = true;
    //         d.holidayName = p.name;
    //       }
    //     })

    //     leaves.forEach((l) => {
    //       if (d.actualDate === l.start_date) {
    //         d.isHoliday = true;
    //         d.leaveName = l.leave_id;
    //         d.leave_type = l.leave_type;
    //         d.reason = l.reason ? l.reason : '';
    //         d.first_name = l.first_name;
    //         d.last_name = l.last_name;
    //         d.startDate = l.start_date;
    //         d.is_approved = l.is_approved;
    //         d.is_rejected = l.is_rejected;
    //         d.department = l.department;
    //         d.designation = l.designation;
    //         d.endDate = l.end_date ? l.end_date : '';
    //       }
    //     })
    //   });
    // }

    // function addWeeks(currentStartDate, currentEndDate, isScrollRight) {

    //   !leaveFetchInProgress && getLeaves(isScrollRight ? true : false, currentStartDate, currentEndDate, leave, status.id, departmentSelected);

    // isScrollRight ? setLeaves([...leaves, ...weekDays]) : setLeaves([...weekDays, ...leaves]);
    // }

    //   const onLeaveOptionSelect = (e) => {

    //     setleave(e);
    //     setIsClearClicked(true)

    //     if (view === 'year') {
    //       currentStartDate = new Date(yearChange, 0); currentEndDate = new Date(yearChange, 11, 31);
    //     }
    //     else {
    //       currentStartDate = startDate; currentEndDate = endDate;
    //     }
    // setScrollRightDates({
    //   currentStartDate: currentStartDate,
    //   currentEndDate: currentEndDate
    // });

    // setScrollLeftDates({
    //   currentStartDate: currentStartDate,
    //   currentEndDate: currentEndDate
    // });
    //     getLeaves('', currentStartDate, currentEndDate, e.id !== 0 ? e.id : '', status.id, departmentSelected);
    //   }

    //   const onStatusOptionSelect = (e) => {
    //     let statusSelected = e.id;
    //     setStatus(e);
    //     setIsClearClicked(true)
    //     if (view === 'year') {
    //       currentStartDate = new Date(yearChange, 0); currentEndDate = new Date(yearChange, 11, 31);
    //     }
    //     else {
    //       currentStartDate = startDate; currentEndDate = endDate;
    //     }

    // setScrollRightDates({
    //   currentStartDate: currentStartDate,
    //   currentEndDate: currentEndDate
    // });

    // setScrollLeftDates({
    //   currentStartDate: currentStartDate,
    //   currentEndDate: currentEndDate
    // });

    //     newWeekDays = [];
    //     setLeaves([])
    //     getLeaves('', currentStartDate, currentEndDate, leave.id, statusSelected, departmentSelected);
    //   }

    //   const onDepartmentOptionSelect = (e) => {
    //     setIsClearClicked(true)
    //     let selectedDepartments = '';
    //     for (let d in e) {
    //       if (+e.length === +d + 1) selectedDepartments += `${e[d].id}`;
    //       else selectedDepartments += `${e[d].id},`;
    //     }
    //     if (view === 'year') {
    //       currentStartDate = new Date(yearChange, 0);
    //       currentEndDate = new Date(yearChange, 11, 31);
    //     }
    //     else {
    //       currentStartDate = startDate;
    //       currentEndDate = endDate;
    //     }

    // setScrollRightDates({
    //   currentStartDate: currentStartDate,
    //   currentEndDate: currentEndDate
    // });

    // setScrollLeftDates({
    //   currentStartDate: currentStartDate,
    //   currentEndDate: currentEndDate
    // });

    //     getLeaves('', currentStartDate, currentEndDate, leave.id, status.name.toLowerCase(), selectedDepartments);
    //     setDepartment(e);
    //     setDepartmentSelected(selectedDepartments)
    //   }

    //   const handleDateChange = (dateRange) => {

    //     let newChangedStartDate;

    //     if (dateRange.length > 4) {

    //       newChangedStartDate = new Date(new Date(dateRange).getFullYear(), new Date(dateRange).getMonth());
    //       currentStartDate = newChangedStartDate;
    //       currentEndDate = getLastDayOfMonth(currentStartDate.getFullYear(), currentStartDate.getMonth());
    //       setYearState({ newYear: new Date(newChangedStartDate).getFullYear(), month: new Date(newChangedStartDate).getMonth() });
    // setScrollRightDates({
    //   currentStartDate: currentStartDate,
    //   currentEndDate: currentEndDate
    // });

    // setScrollLeftDates({
    //   currentStartDate: currentStartDate,
    //   currentEndDate: currentEndDate
    // });
    //     }
    //     else if (dateRange.length === 4) {

    //       currentStartDate = new Date(dateRange, 0);
    //       currentEndDate = new Date(dateRange, 11, 31);
    //       setYearChange(dateRange)
    //     }

    //     setLeaves([]);
    //     newWeekDays = []
    // console.log(currentStartDate, currentEndDate)
    //     getLeaves('', currentStartDate, currentEndDate, leave.id, status.id, departmentSelected);
    //     setStatus(status);
    //     setleave(leave);
    //     setDepartment(department);

    // console.log(formatDate(new Date(new Date(currentStartDate).getFullYear(), new Date(currentStartDate).getMonth(), 1)))
    // if (!document.getElementById(formatDate(new Date(new Date(currentStartDate).getFullYear(), new Date(currentStartDate).getMonth(), 1)))) return ;

    //     setTimeout(() => {

    //       const left = 10;
    //       domContent.current.scroll({
    //         top: 0,
    //         left: left,
    //         behavior: 'instant'
    //       })
    //     }, 500);
    //   }


    //   const getResource = () => { // gets resourceId of the user through email
    //     const apiPayLoad = null;
    //     APIService.apiRequest(
    //       Constants.API_BASE_URL + `/email_to_resource/${userDetails.email}`, apiPayLoad, false, "GET"
    //     ).then((response) => {
    //       if (response.status === 1) {
    //         setActualResourceId(response.output.id);
    //       }
    //     })
    //   }



    //   const handleProfileClick = (searchItemClicked) => {

    //     setSearchItemClicked(searchItemClicked)
    //     if (searchItemClicked.status) {
    //       if (+actualResourceId === +searchItemClicked.resource_id) {
    //         handleTabOpen('myLeaves');
    //       }
    //       else {
    //         let existingItem;
    //         if (localStorage.getItem(Constants.SITE_PREFIX + 'recentSearchItem')) { // check if data already exists in local storage, if yes then parse it to object
    //           existingItem = JSON.parse(localStorage.getItem(Constants.SITE_PREFIX + 'recentSearchItem'))
    //         }
    //         if (searchItemClicked.first_name !== 'Not found' && !recentlySearched.find(item => { return item.id === searchItemClicked.resource_id })) {
    //           setRecentlySearched([{
    //             first_name: searchItemClicked.first_name, last_name: searchItemClicked.last_name, resource_id: searchItemClicked.resource_id, designation: searchItemClicked.designation,
    //             department: searchItemClicked.department
    //           }, ...recentlySearched]);


    //           if (!existingItem) {// if no data exists in local storage
    //             localStorage.setItem(Constants.SITE_PREFIX + 'recentSearchItem', JSON.stringify({
    //               leaveManagement: [{
    //                 first_name: searchItemClicked.first_name, last_name: searchItemClicked.last_name, resource_id: searchItemClicked.resource_id, designation: searchItemClicked.designation,
    //                 department: searchItemClicked.department, img_url: searchItemClicked.img_url
    //               }]
    //             }));
    //           }
    //           else {
    //             if (existingItem && !existingItem.leaveManagement.find(item => { return +item.resource_id === +searchItemClicked.resource_id })) //check if data exists in local storage & current item being set is not already present in it
    //             {
    //               localStorage.setItem(Constants.SITE_PREFIX + 'recentSearchItem', JSON.stringify({
    //                 leaveManagement: [{
    //                   first_name: searchItemClicked.first_name,
    //                   last_name: searchItemClicked.last_name,
    //                   resource_id: searchItemClicked.resource_id,
    //                   designation: searchItemClicked.designation,
    //                   department: searchItemClicked.department,
    //                   img_url: searchItemClicked.img_url

    //                 }, ...existingItem.leaveManagement]
    //               }));
    //             }
    //           }
    //         }

    //         const newSelected = tabs.tabs.findIndex(item => { // checks if tab clicked is new or already existing
    //           return item.id === searchItemClicked.resource_id
    //         });

    //         if (newSelected === -1) { // if tab is new
    //           handleTabOpenClose('open', searchItemClicked.resource_id);
    //           const selected = tabs.tabs.findIndex(item => {
    //             return item.id === newTabSelected;
    //           });

    //           const newTabIndex = tabs.tabs.findIndex(item => {
    //             return item.id === 'newTab';
    //           });

    //           if (selected !== -1) {
    //             tabs.tabs[selected].id = searchItemClicked.resource_id;
    //             tabs.tabs[selected].name = searchItemClicked.first_name + ' ' + searchItemClicked.last_name;
    //           }
    //           else {
    //             tabs.tabs[newTabIndex].id = searchItemClicked.resource_id;
    //             tabs.tabs[newTabIndex].name = searchItemClicked.first_name + ' ' + searchItemClicked.last_name;

    //           }
    //         }
    //         handleTabOpen(searchItemClicked.resource_id, true);
    //       }
    //     }
    //   }

    // Handling Tabs
    //   function handleTabOpen(tabId, isApiCalled = false) {

    //     setTabs({
    //       ...tabs,
    //       tabs: tabs.tabs.map(t => t.id !== tabId ? t : { ...t }),
    //       activeTabId: tabId,
    //     });

    //     if (tabId === 'home') {
    //       props.history.push(`/leaves/${tabId}`);
    //     }

    //     else if (tabId === 'myLeaves') {
    //       props.history.push(`/leaves/my-leaves`);
    //     }
    //     else {

    //       const status = tabs.tabs.filter(item => {
    //         return (+item.id === +tabId)
    //       });
    //       if (!status[0]) return;
    //       if (status[0].id === 'newTab') {
    //         props.history.push('/leaves/newtab');
    //       }
    //       else {
    //         props.history.push(`/leaves/${status[0].name.split(' ')[0].toLowerCase()}_${tabId}`)
    //       }
    //     }

    //     if ((tabId !== 'home' || tabId !== 'myLeaves') && isApiCalled === false) { handleTabOpenClose('open', tabId); }
    //   }

    //   function handleTabRemove(tabId) {
    //     let selectedTabId, selectedName;

    //     const index = tabs.tabs.findIndex(item => { return item.id === tabId })

    //     if (index !== -1) {
    //       selectedTabId = tabs.tabs[index - 1].id
    //       selectedName = tabs.tabs[index - 1].name.toLowerCase()
    //     }

    //     if (selectedTabId !== 'myLeaves') {
    //       selectedName = `${selectedName.split(' ')[0]}_${selectedTabId}`
    //     }
    //     setTabs({
    //       ...tabs,
    //       tabs: tabs.tabs.filter((t) => t.id !== tabId),
    //       activeTabId: selectedTabId
    //     });

    //     handleTabOpenClose('close', tabId);
    //     props.history.push(`/leaves/${selectedName}`)

    //     if (localStorage.getItem(Constants.SITE_PREFIX + "leavemanagement_tabs")) {
    //       const other_tabs = JSON.parse(localStorage.getItem(Constants.SITE_PREFIX + "leavemanagement_tabs"))['tabs_data']['other_tabs'];
    //       delete other_tabs[tabId];
    //       localStorage.setItem(Constants.SITE_PREFIX + "leavemanagement_tabs", JSON.stringify({ tabs_data: { other_tabs } }))
    //     }
    //   }

    //   const handleTabsOrderChange = (reorderTabs) => {

    //     setTabs({
    //       ...tabs, tabs: reorderTabs
    //     });
    //   }

    //   function handleTabAddBtn() {
    //     const newTabName = `New Tab`;
    //     const newTabId = `newTab`;

    //     if (tabs.tabs.findIndex(item => item.id === 'newTab') !== -1) return;

    //     setNewTabSelected(newTabId);

    //     setTabs({
    //       ...tabs, tabs: [...tabs.tabs, { id: newTabId, name: newTabName }],
    //       newTabCounter: tabs.newTabCounter + 1,
    //       activeTabId: newTabId
    //     })
    //     props.history.push(`/leaves/newtab`);
    //   }

    //   function handleTabOpenClose(status, resourceId) {

    //     if (status !== 'close' && resourceId === tabs.activeTabId) return null;
    //     if (resourceId === 'home' || resourceId === 'myLeaves' || resourceId === 'newTab') return null;

    // checks if tab already exits in restored tabs throught API
    //     const isExist = restoredTabs.findIndex(item => { return +item.resource_id === +resourceId })
    //     if (isExist !== -1 && status === 'open') return null;

    //     if (resourceId && status !== 'close') {  //checks if Tab already exists in already opened tabs list
    //       const tabAlreadyOpened = tabs.tabs.findIndex(item => { return +item.id === +recentlySearched.resource_id })
    //       if (tabAlreadyOpened !== -1 && status === 'open') { return; }
    //     }

    //     const apiPayLoad = null;

    //     if (status && resourceId) {

    //       APIService.apiRequest(
    //         Constants.API_BASE_URL + `/leave/${status === 'open' ? 'open_tab' : 'close_tab'}/${resourceId}`, apiPayLoad, false, "PUT"
    //       )
    //         .then((response) => {
    //         })

    //     }
    //   }

    //   function getTabs() {

    //     if (window.innerWidth <= 575) return;
    //     const apiPayLoad = null;
    //     APIService.apiRequest(
    //       Constants.API_BASE_URL + `/leave/tab`, apiPayLoad, false, "GET"
    //     )
    //       .then((response) => {
    //         if (response.status === 1) {
    //           const tabsList = [];
    //           response.output.forEach(item => {
    //             tabsList.push(item.resource_id);
    //           });
    //           restoreTabs(response.output)
    //         }
    //         else {
    //           alertService.error(response.msg)
    //         }
    //       }).catch(err => {
    //         alertService.warning(err.msg)
    //       });
    //   }

    //   const restoreTabs = (output) => {


    //     console.log(output.some(i => String(i.resource_id) === id.split('_')[1]))
    //     if (output.some(i => String(i.resource_id) === id.split('_')[1])) {

    //       setTabs({
    //         ...tabs, tabs: [...tabs.tabs, ...output
    //           .filter(({ resource_id: id1 }) => !tabs.tabs.some(({ id: id2 }) => id2 === String(id1)))
    //           .map(t => (
    //             {
    //               id: String(t.resource_id),
    //               name: t.first_name + ' ' + t.last_name
    //             }
    //           ))],
    //         activeTabId: id.split('_')[1]
    //       });
    //     }
    //     else if (id.includes('my-leaves')) {
    //       setTabs({
    //         ...tabs, tabs: [...tabs.tabs, ...output
    //           .filter(({ resource_id: id1 }) => !tabs.tabs.some(({ id: id2 }) => id2 === String(id1)))
    //           .map(t => (
    //             {
    //               id: String(t.resource_id),
    //               name: t.first_name + ' ' + t.last_name
    //             }
    //           )),
    //         ],
    //         activeTabId: 'myLeaves'
    //       })
    //       props.history.push(`/leaves/my-leaves`);
    //     }
    //     else if (id.includes('newtab')) {
    //       setTabs({
    //         ...tabs, tabs: [...tabs.tabs, ...output
    //           .filter(({ resource_id: id1 }) => !tabs.tabs.some(({ id: id2 }) => id2 === String(id1)))
    //           .map(t => (
    //             {
    //               id: String(t.resource_id),
    //               name: t.first_name + ' ' + t.last_name
    //             }
    //           )),
    //         { id: 'newTab', name: 'New Tab' }],
    //         newTabCounter: tabs.newTabCounter + 1,
    //         activeTabId: 'newTab'
    //       })
    //       props.history.push(`/leaves/newtab`);
    //     }
    //     else {
    //       setTabs({
    //         ...tabs,
    //         tabs: [...tabs.tabs, ...output.map(t => ({
    //           id: String(t.resource_id),
    //           name: t.first_name + ' ' + t.last_name,
    //         }))],
    //         activeTabId: 'home'
    //       });
    //       props.history.push('home');
    //     }

    //     setRestoredTabs(output)
    //   }

    // const logWheelScrollDirection = (e) => {

    //   setScrollDirection(e.deltaX)
    //   // console.log(e.deltaX)
    // }

    function divScrollLeft(selectedElement, origin) {

        let time = 5;
        if (origin === 'firstLoad') time = 1000;
        else if (origin === 'monthLeaveClicked') time = 5


        setTimeout(() => {
            if (domContent) {
                if (!document.getElementById(selectedElement)) return null;
                const left = document.getElementById(selectedElement).getBoundingClientRect().x;
                if (!domContent.current) return null;

                domContent.current.scroll({
                    top: 0,
                    left: left,
                    behavior: 'smooth'
                })
            }

        }, time)
    }




    // function isLastDayOfMonth(date = new Date()) {
    //   const oneDayInMs = 1000 * 60 * 60 * 24;

    //   return new Date(date.getTime() + oneDayInMs).getDate() === 1;
    // }

    // const prevMonth = (dateObj) => {
    //   var tempDateObj = new Date(dateObj);

    //   if (tempDateObj.getMonth) {
    //     tempDateObj.setMonth(tempDateObj.getMonth() - 1, 1);
    //   } else {
    //     tempDateObj.setYear(tempDateObj.getYear() - 1, 1);
    //     tempDateObj.setMonth(12);
    //   }
    //   return tempDateObj
    // };

    // const handleScroll = (element) => {


    //   const width = element.target.childNodes[0].childNodes[0].offsetWidth;
    //   const elementList = element.target.childNodes[0].childNodes;
    //   let xPositionOne = { position: '', item: '' }, xPositionThirty = { position: '', item: '' };
    //   let scrollDate = '';

    //   elementList.forEach(item => {

    //     if (item.id.split('-').includes('02', 1) && item.id.split('-').includes('28', 2)) {
    //       if (isDivInViewport(item)) {
    //         xPositionThirty = { position: item.getBoundingClientRect().x, 'item': item.id }
    //       }
    //     }
    //     else if (item.id.split('-').includes('30', 2)) {
    //       if (isDivInViewport(item)) {
    //         if (+item.id.split('-')[2] === 30) {
    //           xPositionThirty = { position: item.getBoundingClientRect().x, 'item': item.id }
    //         }
    //       }
    //     }

    //     if (item.id.split('-').includes('01', 2)) {
    //       if (isDivInViewport(item)) {
    //         if (+item.id.split('-')[2] === 1) { xPositionOne = { position: window.innerWidth - item.getBoundingClientRect().x, 'item': item.id } }

    //       }
    //     }

    //     if (xPositionOne.item && xPositionThirty.item) {

    //       if ((+xPositionOne.position > +xPositionThirty.position)) {
    //         scrollDate = xPositionOne.item;
    //       }
    //       else if ((+xPositionOne.position < +xPositionThirty.position)) {
    //         scrollDate = xPositionThirty.item
    //       }
    //       setYearState({ newYear: new Date(scrollDate.split('-')[0]).getFullYear(), month: new Date(scrollDate.split('-')[1]).getMonth() });

    //     }

    //   })

    //   let e = document.getElementById("leave-calendar-content");

    //   if (Math.ceil(e.scrollLeft) + e.clientWidth + 7 * width >= e.scrollWidth) {

    //     const rightCurrentStartDate = scrollRightDates.currentEndDate ?
    //       new Date(scrollRightDates.currentEndDate.getTime() + (24 * 60 * 60 * 1000))
    //       : new Date(startDate.getFullYear(), startDate.getMonth() + 1);


    //     const rightCurrentEndDate = getLastDayOfMonth(rightCurrentStartDate.getFullYear(), rightCurrentStartDate.getMonth())
    //     setScrollRightDates({
    //       currentStartDate: rightCurrentStartDate,
    //       currentEndDate: rightCurrentEndDate
    //     });

    // setMonthsLoaded([...monthsLoaded,`${rightCurrentStartDate.getFullYear()}-${rightCurrentStartDate.getMonth()}`])

    //     addWeeks(rightCurrentStartDate, rightCurrentEndDate, true);
    //   }

    //   if (scrollDirection < 0 && Math.ceil(e.scrollLeft) <= 0) {

    //     console.log("here")
    //     const leftCurrentStartDate = scrollLeftDates.currentStartDate
    //       ? prevMonth(scrollLeftDates.currentStartDate)
    //       : prevMonth(startDate)


    //     const leftCurrentEndDate = getLastDayOfMonth(leftCurrentStartDate.getFullYear(), leftCurrentStartDate.getMonth())
    //     setScrollLeftDates({
    //       currentStartDate: leftCurrentStartDate,
    //       currentEndDate: leftCurrentEndDate
    //     });

    //     const totalDays = (leftCurrentEndDate.getTime() - leftCurrentStartDate.getTime()) / (1000 * 3600 * 24) + 1

    //     addWeeks(leftCurrentStartDate, leftCurrentEndDate, false);
    //     !scrollInProgress && scrollToCurrentDate(e, width, totalDays);

    //   }

    // }
    // const scrollToCurrentDate = (e, width, totalDays) => {
    //   setScrollInProgress(true)
    //   setTimeout(() => {
    //     e.scrollTo({
    //       left: width * (totalDays),
    //       behavior: 'auto'
    //     });
    //     setScrollInProgress(false);
    //   }, 100)
    // }
    // const isDivInViewport = (e) => {
    //   const bounding = e.getBoundingClientRect();

    //   if (bounding.top >= 0 && bounding.left >= 0 && bounding.right <= (window.innerWidth || document.documentElement.clientWidth) && bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)) {

    //     return true;
    //   } else {
    //     return false;
    //   }
    // }



    useEffect(() => {
        divScrollLeft(formatDate(new Date()), 'firstLoad')
    }, [])

    useEffect(() => {

        getLeaves('', startDate, endDate)

    }, []); //eslint-disable-line


    return (

        <div className="leave-calendar-content slide"
            id="leave-calendar-content"
            ref={domContent}
        //  onWheel={(e) => logWheelScrollDirection(e)} 
        //  onScroll={(e) => handleScroll(e)}
        >
            <div className="dayView-heading" id="dayView-heading">
                {leaves.map((day, index) => {
                    return (
                        <div key={index + '_' + day.dayNo} className={"day " + day.dayName + `${day.isToday === true ? ' isToday' : ''}`} id={day.actualDate} >
                            {months[day.date.getMonth()]} {"  " + day.dayName.slice(0, 3) + " "} {day.isToday ? <span>{day.dayNo}</span> : day.dayNo}
                        </div>
                    );
                })}
            </div>

            <div className="leave-day-content" >
                {leaves.map((d, index) => {
                    return (<>
                        <div key={d.actualDate + '_' + index} className={"day-content" + ' ' + d.actualDate}> {/*eslint-disable-line*/}
                            <div className={"day-content-inner" + ' ' + `${d.isPublicHoliday === true ? ' publicHoliday' : ''}`} id={`${d.leaveName ? "day-content-" : ''}` + `${d.leaveName ? d.leaveName : ''}`}> {/*eslint-disable-line*/}
                                {d.isPublicHoliday === true ? <p className="publicHoliday-name">{d.holidayName}</p> : ''}
                            </div>
                        </div>
                    </>
                    )
                })}
            </div>
        </div>



    );
}



