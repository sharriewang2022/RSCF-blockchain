/*
// fetch menu items
import axios from 'axios';

const FetchDashboard = async () => {
  const sendData = {
    groupId: localStorage.getItem('groupId')
  }

  const result = await axios.post('http://localhost/sits_api/login/dashboard.php', sendData);
    // return the result
    return result;
  }
 
export default FetchDashboard;

// fetch sub menu items
import axios from 'axios';

const FetchDashboardSubList = async () => {
  const sendData = {
    groupId: localStorage.getItem('groupId'),
    moduleId: 1 // this parameter for each menu
  }

  const result = await axios.post('http://localhost/sits_api/login/dashboardSubList.php', sendData);
    // return the result
    return result;
  }
 
export default FetchDashboardSubList;

<div className="accordion">
                {data.map(({ title, content }) => (
                <AccordionMenu title={title} content=
                  {FetchDashboardSubList().then(resp => {
                    setDataSubList(resp.data);
                    dataSubList.map(({itemNameEng,pageLink}) => (
                    <AccordionMenuSubList itemNameEng={itemNameEng} pageLink={pageLink}/>                   
                    ))
                  })} 
                  />
                ))}
              </div>

*/              