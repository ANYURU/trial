import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Image,
    Font
} from '@react-pdf/renderer'
import logo from '../../assets/images/tube-no-bg.png'
import checked from '../../assets/images/checked.png'
import unchecked from '../../assets/images/notchecked.png'
import moment  from 'moment'
import { currencyFormatter } from '../../helpers/currencyFormatter'

const styles = StyleSheet.create({
    logo:{
      width: 70,
      height: 70,
    },
    headerText: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: "row",
      paddingBottom: 8
    },
    debug: {
      padding: 5,
      border: "solid",
      borderWidth: 1,
      borderColor: "red"
    },
    body: { 
      paddingTop: 25,
      paddingBottom: 65,
      paddingHorizontal: 35,
      flex: 1
    },
    pageNumber: {
      position: "absolute",
      fontsize: 12,
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: "center",
      color: "grey"
    },
    title: {
      fontSize: 10,
      fontWeight: 700,
      paddingBottom: 5
    }


});

function LoanPDF({values, accountsInformation}) {

  console.log("Accounts information: ",accountsInformation)
  const {
    // Personal Information
    applicant_name,
    postal_address,
    landline_number,
    marital_status,

    spouse_name,
    spouse_contact,
    kin_name,
    kin_contact,

    // Physical Address
    district,
    county,
    sub_county,
    parish,
    sub_parish,
    ownership,
    employment,
    securities,
    guarantors,
    amount,
    months,
    amortization_schedule,
    member_id,
    phone_number,
    email_address,
    dob,
    gender,
    position_in_sacco,
    years_spent,

    // Employment details
    employer,
    employer_postal_address,
    employer_no,
    employer_designation,
    retirement_date,
    type_of_employment,
    asset1,
    asset2,
    asset3,
    business_type,
    years_of_operation,
    business_income,

    // Loan particulars
    loan_type,
    existing_loan,
    loan_purpose,
    amount_in_words,
    repayment_method,

    // Loans in other banks
    bank_loans,

    // Securities offered
    securities_offered,

  } = values


  



  console.log(values)
  return (
    <Document>
      {/* Transformed */}
      <Page style={[{ position: 'relative' } ]}>
        <View style={[{flex: 1, justifyContent: 'center', alignItems:'center', width: "100%", height:"100%"}]}>
          {/* Water mark */}
          <View style={[{height: 200, width: 200, flex: 1, justifyContent: 'center', alignItems: 'center', position: "absolute", zIndex: 1}]}>
            <Image src={logo} style={[{opacity: 0.3, width: 150, height: 150, marginBottom: -20}]} />
            <Text style={[{fontSize: 8, opacity: 0.3}]}>BWEYOGERERE TUBEREBUMU CO-OPERATIVE</Text>
            <Text style={[{fontSize: 8, opacity:0.3}]}>SAVING AND CREDIT SOCIETY LTD</Text>
          </View>

          <View style={[{position:'absolute', zIndex: 2, height: "100%", width: "100%"}]}>
            {/* This is where the content of the application form goes. */}
            {/* Begin */}
            <View style={styles.body}>
              <View style={[{height: 160}]}>
                <View style={[{flex: 1.2, alignItems: "center", borderBottom: "solid",
                  borderBottomWidth: 1,
                  borderBottomColor: "black",
                  paddingBottom: 5}]}>
                  <Image style={[styles.logo]} src={logo}/>
                  {/* Second */}
                  <View style={[styles.headerText]}>
                    <Text style={[{fontSize: 10}, {padding: 1}]}>BWEYOGERERE</Text>
                    <View style={[{width: 100, height: 10, justifyContent: "center", alignItems: "center"}]}>
                      <Text style={[{fontSize: 4}]}>BWEYOGERERE TUBEREBUMU CO-OPERATIVE</Text>
                      <Text style={[{fontSize: 4}]}>SAVING AND CREDIT SOCIETY LTD</Text>
                    </View>
                    <Text style={[{fontSize: 10}]}>TUBEREBUMU</Text>
                  </View>
                  <Text style={[{fontSize: 10, paddingBottom:5, paddingTop:2}]}>SACCO LTD</Text>
                </View>
                <View style={[{flex: 0.8, flexDirection:"row", justifyContent:'flex-end', alignItems:"flex-end"}]}>
                  <Text style={[{fontSize: 10, marginRight: 20, paddingBottom: 5}]}>LOAN APPLICATION AND AGREEMENT FORM</Text>
                  <Image style={[{width:50, height:50,borderRadius:"50%"}]} src={logo}/>
                </View>
              </View>
              <Text style={[{fontSize: 10, borderBottomWidth: 1, border: "solid", borderColor:"black"}]}>A. APPLICANT'S PERSONAL INFORMATION</Text>
              
              {/* Line 2 */}
              <View style={[{height:40, marginTop:5, marginBottom:5}]}>
                <View style={[{flex: 1, flexDirection:"row", alignItems:"flex-start"}]}>
                  <View style={[{flex: 1, padding:2}]}>
                    <Text style={[{fontSize:8, paddingRight: 2}]}>Applicant's Name: </Text>
                    <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>{applicant_name || "        "}</Text>
                  </View>
                  <View style={[{flex: 1, padding:2}]}>
                    <Text style={[{fontSize:8, paddingRight: 2}]}>Nationality: </Text>
                    <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>Ugandan</Text>
                  </View>
                  <View style={[{flex: 1, padding:2}]}>
                    <Text style={[{fontSize:8, paddingRight: 2}]}>Member ID: </Text>
                    <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>{member_id || "        "}</Text>
                  </View>
                  <View style={[{flex: 1, padding:2}]}>
                    <Text style={[{fontSize:8, paddingRight: 2}]}>Postal Address: </Text>
                    <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>{postal_address || "      "}</Text>
                  </View>
                </View>
              </View>

              {/* Line 2 */}
              <View style={[{height:40, marginTop:5, marginBottom:5}]}>
                <View style={[{flex: 1, flexDirection:"row"}]}>
                  <View style={[{flex: 1, padding:2}]}>
                    <Text style={[{fontSize:8, paddingRight: 2}]}>Landline No: </Text>
                    <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>{landline_number || "       "}</Text>
                  </View>
                  <View style={[{flex: 1, padding:2}]}>
                    <Text style={[{fontSize:8, paddingRight: 2}]}>Phone Number: </Text>
                    <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>{phone_number || "         "}</Text>
                  </View>
                  <View style={[{flex: 1, padding:2}]}>
                    <Text style={[{fontSize:8, paddingRight: 2}]}>Email: </Text>
                    <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>{email_address || "        "}</Text>
                  </View>
                  <View style={[{flex: 1, padding:2}]}>
                    <Text style={[{fontSize:8, paddingRight: 2}]}>Date of Birth: </Text>
                    <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>{moment(dob).format('DD/MM/YYYY') || "        "}</Text>
                  </View>
                </View>
              </View>
              <View style={[{height:40, marginTop:5, marginBottom:5}]}>
                <View style={[{flex: 1, flexDirection:"row"}]}>
                  <View style={[{flex: 1, padding:2}]}>
                    <Text style={[{fontSize:8, paddingRight: 2}]}>Gender: </Text>
                    <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black", textTransform:"capitalize"}]}>{gender || "      "}</Text>
                  </View>
                  <View style={[{flex: 1, padding:2}]}>
                    <Text style={[{fontSize:8, paddingRight: 2}]}>Position in Sacco: </Text>
                    <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black", textTransform:"capitalize"}]}>{position_in_sacco || "      "}</Text>
                  </View>
                  <View style={[{flex: 1, padding:2}]}>
                    <Text style={[{fontSize:8, paddingRight: 2}]}>Postal Address: </Text>
                    <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>{postal_address ||  "       "}</Text>
                  </View>
                  <View style={[{flex: 1, padding:2}]}>
                    <Text style={[{fontSize:8, paddingRight: 2}]}>Marital status: </Text>
                    <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black", textTransform:"capitalize"}]}>{marital_status || "       "}</Text>
                  </View>
                </View>
              </View>

              <Text style={[{fontSize: 9}]}>Next of Keen</Text>
              <View style={[{height:40, marginTop:5, marginBottom:5}]}>
                <View style={[{flex: 1, flexDirection:"row"}]}>
                  <View style={[{flex: 1, padding:2}]}>
                    <Text style={[{fontSize:8, paddingRight: 2}]}>Name: </Text>
                    <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>{kin_name || "        "}</Text>
                  </View>
                  <View style={[{flex: 1, padding:2}]}>
                    <Text style={[{fontSize:8, paddingRight: 2}]}>Contact: </Text>
                    <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>{kin_contact || "        "}</Text>
                  </View>
                  <View style={[{flex: 1, padding:2}]}>
                  </View>  
                  <View style={[{flex: 1, padding:2}]}>
                  </View>
                </View>
              </View>
              <Text style={[{fontSize: 9}]}>Spouse</Text>
              <View style={[{height:40, marginTop:5, marginBottom:5}]}>
                <View style={[{flex: 1, flexDirection:"row"}]}>
                  <View style={[{flex: 1, padding:2}]}>
                    <Text style={[{fontSize:8, paddingRight: 2}]}>Name: </Text>
                    <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>{spouse_name || "        "}</Text>
                  </View>
                  <View style={[{flex: 1, padding:2}]}>
                    <Text style={[{fontSize:8, paddingRight: 2}]}>Contact: </Text>
                    <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>{spouse_contact || "        "}</Text>
                  </View>
                  <View style={[{flex: 1, padding:2}]}>
                  </View>  
                  <View style={[{flex: 1, padding:2}]}>
                  </View>
                </View>
              </View>

              <Text style={[{fontSize: 9}]}>Physical Address</Text>
              <View style={[{height:40, marginTop:5, marginBottom:5}]}>
                <View style={[{flex: 1, flexDirection:"row"}]}>
                  <View style={[{flex: 1, padding:2}]}>
                    <Text style={[{fontSize:8, paddingRight: 2}]}>District: </Text>
                    <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black", textTransform:"capitalize"}]}>{district || "        "}</Text>
                  </View>
                  <View style={[{flex: 1, padding:2}]}>
                    <Text style={[{fontSize:8, paddingRight: 2}]}>County: </Text>
                    <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black", textTransform:"capitalize"}]}>{county || "         "}</Text>
                  </View>
                  <View style={[{flex: 1, padding:2}]}>
                    <Text style={[{fontSize:8, paddingRight: 2}]}>Sub County: </Text>
                    <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black", textTransform:"capitalize"}]}>{sub_county || "        "}</Text>
                  </View>
                  <View style={[{flex: 1, padding:2}]}>
                    <Text style={[{fontSize:8, paddingRight: 2}]}>Parish: </Text>
                    <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black", textTransform:"capitalize"}]}>{parish || "        "}</Text>
                  </View>
                </View>
              </View>
              <View style={[{height:40, marginTop:5, marginBottom:5}]}>
                <View style={[{flex: 1, flexDirection:"row"}]}>
                  <View style={[{flex: 1, padding:2}]}>
                    <Text style={[{fontSize:8, paddingRight: 2}]}>Sub Parish: </Text>
                    <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black", textTransform:"capitalize"}]}>{sub_parish || "          "}</Text>
                  </View>
                  <View style={[{flex: 1, padding:2}]}>
                    <Text style={[{fontSize:8, paddingRight: 2}]}>Years spent: </Text>
                    <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>{`${years_spent} years` || "          "}</Text>
                  </View>
                  <View style={[{flex: 1, padding:2}]}>

                  </View>
                  <View style={[{flex: 1, padding:2}]}>

                  </View>
                </View>
              </View>
              <Text style={[{fontSize: 10, marginBottom: 3}]}>B. EMPLOYMENT DETAILS</Text>
              <View style={[{height:20}]}>
                <View style={[{flex: 1, flexDirection: "row"}]}>
                  <Text style={[{fontSize: 8}]}>Employment status: </Text>
                  <Text style={[{fontSize: 8}]}>Employed</Text>
                  <Image src={employment === "employed" ? checked : unchecked} style={[{width:10, height:10}]}/>
                  <Text style={[{fontSize: 8, marginLeft: 5}]}>Self Employed</Text>
                  <Image src={employment === "business" ? checked : unchecked} style={[{width:10, height:10}]}/>
                </View>
              </View>
              <View style={[{height:40, marginTop:5, marginBottom:5}]}>
                <View style={[{flex: 1, flexDirection:"row"}]}>
                  <View style={[{flex: 1, padding:2}]}>
                    <Text style={[{fontSize:8, paddingRight: 2}]}>Employer's Name: </Text>
                    <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>{employer || "       "}</Text>
                  </View>
                  <View style={[{flex: 1, padding:2}]}>
                    <Text style={[{fontSize:8, paddingRight: 2}]}>Postal Address: </Text>
                    <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>{employer_postal_address || "       "}</Text>
                  </View>
                  <View style={[{flex: 1, padding:2}]}>
                    <Text style={[{fontSize:8, paddingRight: 2}]}>Telephone Number: </Text>
                    <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>{employer_no || "       "}</Text>
                  </View>
                  <View style={[{flex: 1, padding:2}]}>
                    <Text style={[{fontSize:8, paddingRight: 2}]}>Designation: </Text>
                    <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>{employer_designation || "       "}</Text>
                  </View>
                </View>
              </View>
              <View style={[{height:40, marginTop:5, marginBottom:5}]}>
                <View style={[{flex: 1, flexDirection:"row"}]}>
                  <View style={[{flex: 1, padding:2}]}>
                    <Text style={[{fontSize:8, paddingRight: 2}]}>Retirement Date: </Text>
                    <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>{retirement_date || "       "}</Text>
                  </View>
                  <View style={[{flex: 1, padding:2}]}>
                    <Text style={[{fontSize:8, paddingRight: 2}]}>Employment Terms: </Text>
                    <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>{type_of_employment || "        "}</Text>
                  </View>
                  <View style={[{flex: 2, padding:2}]}>
                    <Text style={[{fontSize:8, paddingRight: 2}]}>Assets owned: </Text>
                    <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>{ asset3 ? `${asset1},  ${asset2} and ${asset3}` : `${asset1} and ${asset2}` || "        "}</Text>
                  </View>
                </View>
              </View>
              <View style={[{height:40, marginTop:5, marginBottom:5}]}>
                <View style={[{flex: 1, flexDirection:"row"}]}>
                  <View style={[{flex: 1, padding:2}]}>
                    <Text style={[{fontSize:8, paddingRight: 2}]}>Type of Business: </Text>
                    <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>{business_type || "      "}</Text>
                  </View>
                  <View style={[{flex: 1, padding:2}]}>
                    <Text style={[{fontSize:8, paddingRight: 2}]}>Years of operation: </Text>
                    <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>{`${years_of_operation} years` || "        "}</Text>
                  </View>
                  <View style={[{flex: 1, padding:2}]}>
                    <Text style={[{fontSize:8, paddingRight: 2}]}>Business Income: </Text>
                    <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>{business_income ? `UGX ${currencyFormatter(business_income)}` : "         "}</Text>
                  </View>
                  <View style={[{flex: 1, padding:2}]}>

                  </View>
                </View>
              </View>

            </View>
            {/* End */}        
          </View>

          {/* page number */}
          <Text style={[{textAlign: 'center', width: "100%", fontSize: 8, position:'absolute', bottom: 15}]} render={({pageNumber, totalPages}) => (
            `Page ${pageNumber} of ${totalPages}`
          )}/>
          <Text style={[{textAlign: 'left', width: "100%", fontSize: 8, position:'absolute', bottom:15, paddingLeft:15}]}>Revised: 19.06.2016</Text> 
          
        </View>
      </Page> 
      <Page style={[{ position: 'relative' } ]}>
        <View style={[{flex: 1, justifyContent: 'center', alignItems:'center', width: "100%", height:"100%"}]}>
          {/* Water mark */}
          <View style={[{height: 200, width: 200, flex: 1, justifyContent: 'center', alignItems: 'center', position: "absolute", zIndex: 1}]}>
            <Image src={logo} style={[{opacity: 0.3, width: 150, height: 150, marginBottom: -20}]} />
            <Text style={[{fontSize: 8, opacity: 0.3}]}>BWEYOGERERE TUBEREBUMU CO-OPERATIVE</Text>
            <Text style={[{fontSize: 8, opacity:0.3}]}>SAVING AND CREDIT SOCIETY LTD</Text>
          </View>
          <View style={[{position:'absolute', zIndex: 2, height: "100%", width: "100%"}]}>
            {/* This is where the content of the application form goes. */}
            {/* Begin */}
            <View style={styles.body}>
              <Text style={[{fontSize: 10}]}>C. LOAN PARTICULARS</Text>
              <View style={[{height:40, marginTop:5, marginBottom:5}]}>
                <View style={[{flex: 1, flexDirection:"row"}]}>
                  <View style={[{flex: 1, padding:2}]}>
                    <Text style={[{fontSize:8, paddingRight: 2}]}>Loan Type: </Text>
                    <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black", textTransform:"capitalize"}]}>{loan_type || "       "}</Text>
                  </View>
                  <View style={[{flex: 1, padding:2}]}>
                    <Text style={[{fontSize:8, paddingRight: 2}]}>Extended Loan Id: </Text>
                    <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>{existing_loan || "       "}</Text>
                  </View>
                  <View style={[{flex: 1, padding:2}]}>
                    <Text style={[{fontSize:8, paddingRight: 2}]}>Purpose of Loan: </Text>
                    <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>{loan_purpose || "       "}</Text>
                  </View>
                  <View style={[{flex: 1, padding:2}]}>
                    <Text style={[{fontSize:8, paddingRight: 2}]}>Amount applied for in figures: </Text>
                    <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>{currencyFormatter(amount) ||  "       "}</Text>
                  </View>
                </View>
              </View>
              <View style={[{height:40, marginTop:5, marginBottom:5}]}>
                <View style={[{flex: 2, flexDirection:"row"}]}>
                  <View style={[{flex: 1, padding:2}]}>
                    <Text style={[{fontSize:8, paddingRight: 2}]}>Amount applied for in words: </Text>
                    <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>{ amount_in_words || "       "}</Text>
                  </View>
                  <View style={[{flex: 1, padding:2}]}>
                    <Text style={[{fontSize:8, paddingRight: 2}]}>Repayment period: </Text>
                    <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>{`${months} months`}</Text>
                  </View>
                  <View style={[{flex: 1, padding:2}]}>
                    <Text style={[{fontSize:8, paddingRight: 2}]}>Repayment method: </Text>
                    <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>{ repayment_method || "       "}</Text>
                  </View>
                  {/* <View style={[{flex: 1, padding:2}]}>
                    
                  </View> */}
                </View>
              </View>
              <Text style={[{fontSize: 9}]}>LOANS IN OTHER BANKS</Text>
              <View style={[{height:40, marginTop:5, marginBottom:5}]}>
                <View style={[{flex: 1, flexDirection:"row"}]}>
                  <View style={[{flex: 1, padding:2}]}>
                    <Text style={[{fontSize:8, paddingRight: 2}]}>Name: </Text>
                    <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>{bank_loans[0]?.name ? bank_loans[0]["name"]  : "        "}</Text>
                  </View>
                  <View style={[{flex: 1, padding:2}]}>
                    <Text style={[{fontSize:8, paddingRight: 2}]}>Amount advannced: </Text>
                    <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>{bank_loans[0]?.amount_advanced ? `UGX ${currencyFormatter(bank_loans[0].amount_advanced)}` : "        "}</Text>
                  </View>
                  <View style={[{flex: 1, padding:2}]}>
                    <Text style={[{fontSize:8, paddingRight: 2}]}>Date granted: </Text>
                    <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>{bank_loans[0]?.date_granted ? moment(bank_loans[0].date_granted).format("DD/MM/YYYY") : "        "}</Text>
                  </View>
                  <View style={[{flex: 1, padding:2}]}>
                    <Text style={[{fontSize:8, paddingRight: 2}]}>Repayment period: </Text>
                    <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>{bank_loans[0]?.repayment_period ? `${bank_loans[0]["repayment_period"]} months` :  "        "} </Text>
                  </View>
                  <View style={[{flex: 1, padding:2}]}>
                    <Text style={[{fontSize:8, paddingRight: 2}]}>Balance: </Text>
                    <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>{bank_loans[0]?.balance ? `UGX ${currencyFormatter(bank_loans[0].balance)}` :`UGX 0`}</Text>
                  </View>
                </View>
              </View>
              <View style={[{height:40, marginTop:5, marginBottom:10}]}>
                <View style={[{flex: 1, flexDirection:"row"}]}>
                  <View style={[{flex: 1, padding:2}]}>
                    <Text style={[{fontSize:8, paddingRight: 2}]}>Name: </Text>
                    <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>{bank_loans[1]?.name ? bank_loans[1]["name"]  : "        "}</Text>
                  </View>
                  <View style={[{flex: 1, padding:2}]}>
                    <Text style={[{fontSize:8, paddingRight: 2}]}>Amount advannced: </Text>
                    <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>{bank_loans[1]?.amount_advanced ? `UGX ${currencyFormatter(bank_loans[1].amount_advanced)}` : "        "}</Text>
                  </View>
                  <View style={[{flex: 1, padding:2}]}>
                    <Text style={[{fontSize:8, paddingRight: 2}]}>Date granted: </Text>
                    <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>{bank_loans[1]?.date_granted ? moment(bank_loans[1].date_granted).format("DD/MM/YYYY") : "        "}</Text>
                  </View>
                  <View style={[{flex: 1, padding:2}]}>
                    <Text style={[{fontSize:8, paddingRight: 2}]}>Repayment period: </Text>
                    <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>{bank_loans[1]?.repayment_period ? `${bank_loans[1]["repayment_period"]} months` :  "        "}</Text>
                  </View>
                  <View style={[{flex: 1, padding:2}]}>
                    <Text style={[{fontSize:8, paddingRight: 2}]}>Balance: </Text>
                    <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>{bank_loans[1]?.balance ? `UGX ${currencyFormatter(bank_loans[1].balance)}` : `UGX 0`}</Text>
                  </View>
                </View>
              </View>
              <Text style={[{fontSize: 10, marginVertical:5}]}>D. SECURITY DETAILS</Text>
              <Text style={[{fontSize: 8, marginBottom: 3}]}>I offer the following security</Text>

              <View style={[{height:20}]}>
                <View style={[{flex: 1, flexDirection: "row"}]}>
                  <View style={[{flex: 1, flexDirection:"row"}]}>
                    <Text style={[{fontSize: 8, marginRight: 2}]}>Salary</Text>
                    <Image src={securities.includes("salary") ? checked : unchecked} style={[{width:10, height:10}]}/>
                  </View>
                  <View style={[{flex: 1, flexDirection:"row"}]}>
                    <Text style={[{fontSize: 8, marginRight: 2}]}>Shares</Text>
                    <Image src={securities.includes("shares") ? checked : unchecked} style={[{width:10, height:10}]}/>
                  </View>
                  <View style={[{flex: 1, flexDirection:"row"}]}>
                    <Text style={[{fontSize: 8, marginRight:2}]}>Savings</Text>
                    <Image src={securities.includes("savings") ? checked : unchecked} style={[{width:10, height:10}]}/>
                  </View>
                  <View style={[{flex: 1, flexDirection:"row"}]}>
                    <Text style={[{fontSize: 8, marginRight:2}]}>Guarantors</Text>
                    <Image src={securities.includes("guarantors") ? checked : unchecked} style={[{width:10, height:10}]}/>
                  </View>
                </View>
              </View>
              <View style={[{height:20, marginBottom:20}]}>
                <View style={[{flex: 1, flexDirection:"row"}]}>
                  <View style={[{flex: 1, padding:2}]}>
                    <Text style={[{fontSize:8, paddingRight: 2}]}>Others </Text>
                    <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>{"     "}</Text>
                  </View>
                  <View style={[{flex: 1, padding:2}]}>
                    {/* <Text style={[{fontSize:8, paddingRight: 2}]}>Repayment period: </Text>
                    <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>5 months</Text> */}
                  </View>
                  <View style={[{flex: 1, padding:2}]}>
                    {/* <Text style={[{fontSize:8, paddingRight: 2}]}>Repayment method: </Text>
                    <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>Cash</Text> */}
                  </View>
                  <View style={[{flex: 1, padding:2}]}>
                    {/* <Text style={[{fontSize:8, paddingRight: 2}]}>Amount applied for in figures: </Text>
                    <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>1,000,000</Text> */}
                  </View>
                </View>
              </View>

              
              <Text style={[{fontSize:9, marginVertical: 3, borderBottom: "solid", borderBottomWidth: 1, borderBottomColor: "black", width: 45}]}>Conditions</Text>
              <Text style={[{fontSize:8, marginVertical: 2}]}>1. Provide a minimum of 3 guarantors for loans above 1 million and those who have not guaranteed more
      than 5 loans which are still in service.</Text>
              <Text style={[{fontSize:8, marginVertical: 2}]}>2. The applicant’s deposits plus those of the guarantor must be sufficient enough to secure a loan.</Text>
              <Text style={[{fontSize:8, marginVertical: 2}]}>3. The Sacco my at its discretion reject a guarantor proposed by the applicant.</Text>

              <Text style={[{fontSize:9, marginTop: 20, marginBottom:3}]}>CAUTION</Text>
              <Text style={[{fontSize:8, marginTop: 2}]}>Guarantors are advised to read all the information supplied in this form by the applicant and terms and conditions contained in order to understand the full implication of loan guarantee.</Text>


              <Text style={[{fontSize: 10, marginBottom: 5, marginTop:20}]}>E. REPAYMENT GUARANTEE (Completed by Guarantors)</Text>
              <Text style={[{fontSize:8, marginVertical: 2}]}>We, the undersigned, hereby accept and jointly and severely, liability for the repayment of this loan in the event of the borrower’s default. We understand that the amount in default may be recovered by an offset against our deposits or attachment of our property, salary, FOSA deposits and other property owned by us.</Text>

              {
                <View style={[{marginTop: 15, marginBottom: 15}]}>
                  <View style={[{height: 12}]}>
                    <View style={[{flex: 1, borderBottom: "solid", borderBottomWidth: 1, borderBottomColor: "black", flexDirection:"row", borderTop: "solid", borderTopWidth: 1, borderTopColor: "black", borderRight:"solid", borderRightWidth: 1, borderRightColor: "black", borderLeft: "solid", borderLeftWidth:1, borderLeftColor:"black"}]}>
                      <Text style={[{flex:0.06, fontSize:8, borderRight: "solid", borderRightWidth: 1, borderRightColor: "black", paddingLeft: 5}]}>Sn. </Text>
                      <Text style={[{flex:0.47, fontSize:8, borderRight: "solid", borderRightWidth: 1, borderRightColor: "black", paddingLeft: 5}]}>Name</Text>
                      <Text style={[{flex:0.47, fontSize:8, paddingLeft:5}]}>Telephone Number</Text>
                    </View>
                  </View>
                  {
                    guarantors.map((guarantor, index) => {
                      return (
                        <View key={index} style={[{height: 12}]}>
                          <View style={[{flex: 1, borderBottom: "solid", borderBottomWidth: 1, borderBottomColor: "black", flexDirection:"row", borderRight:"solid", borderRightWidth: 1, borderRightColor: "black", borderLeft: "solid", borderLeftWidth:1, borderLeftColor:"black"}]}>
                            <Text style={[{flex:0.06, fontSize:8, borderRight: "solid", borderRightWidth: 1, borderRightColor: "black", paddingLeft: 5}]}>{index + 1}</Text>
                            <Text style={[{flex:0.47, fontSize:8, borderRight: "solid", borderRightWidth: 1, borderRightColor: "black", paddingLeft: 5}]}>{guarantor.name}</Text>
                            <Text style={[{flex:0.47, fontSize:8, paddingLeft:5}]}>{guarantor.contact}</Text>
                          </View>
                        </View>
                      )
                    })
                  }
                </View>
              }
              <View style={[{flex: 1, justifyContent:'flex-end'}]}>
                <Text style={[{fontSize:8, marginVertical: 2}]}>Note: (Financial statements of the above individuals based on their account numbers must be attached to this form)</Text>
              </View>
            </View>
            {/* End */} 

            {/* page number */}
            <Text style={[{textAlign: 'center', width: "100%", fontSize: 8, position:'absolute', bottom: 15}]} render={({pageNumber, totalPages}) => (
              `Page ${pageNumber} of ${totalPages}`
            )}/>
            <Text style={[{textAlign: 'left', width: "100%", fontSize: 8, position:'absolute', bottom:15, paddingLeft:15}]}>Revised: 19.06.2016</Text> 
                  
          </View>
        </View>
      </Page>  
      <Page style={[{ position: 'relative' } ]}>
        <View style={[{flex: 1, justifyContent: 'center', alignItems:'center', width: "100%", height:"100%"}]}>
          {/* Water mark */}
          <View style={[{height: 200, width: 200, flex: 1, justifyContent: 'center', alignItems: 'center', position: "absolute", zIndex: 1}]}>
            <Image src={logo} style={[{opacity: 0.3, width: 150, height: 150, marginBottom: -20}]} />
            <Text style={[{fontSize: 8, opacity: 0.3}]}>BWEYOGERERE TUBEREBUMU CO-OPERATIVE</Text>
            <Text style={[{fontSize: 8, opacity:0.3}]}>SAVING AND CREDIT SOCIETY LTD</Text>
          </View>
          <View style={[{position:'absolute', zIndex: 2, height: "100%", width: "100%"}]}>
            {/* This is where the content of the application form goes. */}
            {/* Begin */}
            <View style={{ 
              paddingTop: 25,
              paddingBottom: 25,
              paddingHorizontal: 35,
              flex: 1
            }}>
              <Text style={[{fontSize:9, marginVertical: 3, borderBottom: "solid", borderBottomWidth: 1, borderBottomColor: "black", width: 160,}]}>DECLARATION OF THE BORROWER</Text>
              <Text style={[{fontSize:8, marginVertical: 2}]}>{`I ${applicant_name} declare the information given herein is true to the best of my knowledge and belief I further authorize Bweyogerere Tuberebumu Sacco to verify the information fiven herein and make reference from any person(s) and /or institution herein:`}</Text>
              <Text style={[{fontSize: 10, marginTop: 15, marginBottom: 5}]}>F. SECURITY OFFERED FOR THE LOAN</Text>
              <Text style={[{fontSize: 8, marginTop: 2, marginBottom: 5}]}>(One or both securities can be used depending on the magnitude of the loan)</Text>
              <View style={[{marginTop: 15, marginBottom: 15}]}>
                  <View style={[{height: 12}]}>
                    <View style={[{flex: 1, borderBottom: "solid", borderBottomWidth: 1, borderBottomColor: "black", flexDirection:"row", borderTop: "solid", borderTopWidth: 1, borderTopColor: "black", borderRight:"solid", borderRightWidth: 1, borderRightColor: "black", borderLeft: "solid", borderLeftWidth:1, borderLeftColor:"black"}]}>
                      <Text style={[{flex:1, fontSize:8, borderRight: "solid", borderRightWidth: 1, borderRightColor: "black", paddingLeft: 5}]}>Security </Text>
                      <Text style={[{flex:1, fontSize:8, borderRight: "solid", borderRightWidth: 1, borderRightColor: "black", paddingLeft: 5}]}>Amount</Text>
                      <Text style={[{flex:1, fontSize:8, paddingLeft:5}]}>Desciption</Text>
                    </View>
                  </View>
                  <View style={[{height: 20}]}>
                    <View style={[{flex: 1, borderBottom: "solid", borderBottomWidth: 1, borderBottomColor: "black", flexDirection:"row", borderRight:"solid", borderRightWidth: 1, borderRightColor: "black", borderLeft: "solid", borderLeftWidth:1, borderLeftColor:"black"}]}>
                      <Text style={[{flex:1, fontSize:8, borderRight: "solid", borderRightWidth: 1, borderRightColor: "black", paddingLeft: 5}]}>Shares</Text>
                      <Text style={[{flex:1, fontSize:8, borderRight: "solid", borderRightWidth: 1, borderRightColor: "black", paddingLeft: 5}]}>{accountsInformation?.shares?.balance > 0 ? `UGX ${ accountsInformation.shares.balance / Number(securities_offered[0].shares) * 100}` :  "UGX 0"}</Text>
                      <Text style={[{flex:1, fontSize:8, paddingLeft:5}]}>{ securities_offered[0]?.shares ? `${securities_offered[0].shares}% of the current balance on member's shares account.` : "         " }</Text>
                    </View>
                  </View>
                  <View style={[{height: 20}]}>
                    <View style={[{flex: 1, borderBottom: "solid", borderBottomWidth: 1, borderBottomColor: "black", flexDirection:"row", borderRight:"solid", borderRightWidth: 1, borderRightColor: "black", borderLeft: "solid", borderLeftWidth:1, borderLeftColor:"black"}]}>
                      <Text style={[{flex:1, fontSize:8, borderRight: "solid", borderRightWidth: 1, borderRightColor: "black", paddingLeft: 5}]}>Savings</Text>
                      <Text style={[{flex:1, fontSize:8, borderRight: "solid", borderRightWidth: 1, borderRightColor: "black", paddingLeft: 5}]}>{accountsInformation?.savings?.balance > 0 ? `UGX ${ accountsInformation.savings.balance / Number(securities_offered[0].savings) * 100}` : "UGX 0"}</Text>
                      <Text style={[{flex:1, fontSize:8, paddingLeft:5}]}>{ securities_offered[0]?.savings ? `${securities_offered[0].savings}% of the current balance on member's savings balance.` : "          "}</Text>
                    </View>
                  </View>
                  <View style={[{height: 20}]}>
                    <View style={[{flex: 1, borderBottom: "solid", borderBottomWidth: 1, borderBottomColor: "black", flexDirection:"row", borderRight:"solid", borderRightWidth: 1, borderRightColor: "black", borderLeft: "solid", borderLeftWidth:1, borderLeftColor:"black"}]}>
                      <Text style={[{flex:1, fontSize:8, borderRight: "solid", borderRightWidth: 1, borderRightColor: "black", paddingLeft: 5}]}>Log Book(50% value)</Text>
                      <Text style={[{flex:1, fontSize:8, borderRight: "solid", borderRightWidth: 1, borderRightColor: "black", paddingLeft: 5}]}>{"       "}</Text>
                      <Text style={[{flex:1, fontSize:8, paddingLeft:5}]}>{"          "}</Text>
                    </View>
                  </View>
                  <View style={[{height: 20}]}>
                    <View style={[{flex: 1, borderBottom: "solid", borderBottomWidth: 1, borderBottomColor: "black", flexDirection:"row", borderRight:"solid", borderRightWidth: 1, borderRightColor: "black", borderLeft: "solid", borderLeftWidth:1, borderLeftColor:"black"}]}>
                      <Text style={[{flex:1, fontSize:8, borderRight: "solid", borderRightWidth: 1, borderRightColor: "black", paddingLeft: 5}]}>Other collateral security required by Sacco</Text>
                      <Text style={[{flex:1, fontSize:8, borderRight: "solid", borderRightWidth: 1, borderRightColor: "black", paddingLeft: 5}]}>{"       "}</Text>
                      <Text style={[{flex:1, fontSize:8, paddingLeft:5}]}>{"          "}</Text>
                    </View>
                  </View>
              </View>
              <Text style={[{fontSize: 10, marginTop: 15, marginBottom: 5, borderBottom: "solid", borderBottomWidth: 1, borderBottomColor:"black", width: 180}]}>DELIVERING FINANCIAL FREEDOM</Text>
              <Text style={[{fontSize:8, marginTop: 2, marginBottom: 5}]}>{`I ${applicant_name} hereby declare the foregoing particulars are true to the best of my knowledge and belief and I agree to abide by the By-laws of Bweyogerere Tuberebumu Sacco, loan policy`}</Text>
              <Text style={[{fontSize:8, marginTop: 2, marginBottom: 5}]}>{`I also understand that the basic rules applicable to this application are listed and understand the loan will be granted according to these rules.`}</Text>

              <View style={[{paddingHorizontal:15, height:500 }]}>
                <View style={[{flex:0.075, flexDirection: "row", marginTop: 2, marginBottom: 5}]}>
                  <Text style={[{fontSize:8, width:10}]}>1. </Text>
                  <Text style={[{fontSize:8, flex: 0.9}]}>{`I confirm that I have authorized Bweyogerere Tuberebumu Sacco Society to access my credit profile and that this profile can be delivered to their e-mail/postal address as indicated herein and authorize ...........................................................(BANK) to mail/deliver/send my credit report to the email/postal address indicated herein.`}</Text>
                </View>
                <View style={[{flex:0.035, flexDirection: "row", marginTop: 2, marginBottom: 5}]}>
                  <Text style={[{fontSize:8, width:10}]}>2. </Text>
                  <Text style={[{fontSize:8, flex: 0.9}]}>{`Members are limited to two (2) times the sum of shares and deposits held, but subject to availability of funds.`}</Text>
                </View>
                <View style={[{flex:0.05, flexDirection: "row", marginTop: 2, marginBottom: 5}]}>
                  <Text style={[{fontSize:8, width:10}]}>3. </Text>
                  <Text style={[{fontSize:8, flex: 0.9}]}>{`Loans shall be made to registered members only i.e. one must have paid the stipulated registration/admission requirements (entrance fees/minimum shares etc) and submitted all required documents.`}</Text>
                </View>
                <View style={[{flex:0.05, flexDirection: "row", marginTop: 2, marginBottom: 5}]}>
                  <Text style={[{fontSize:8, width:10}]}>4. </Text>
                  <Text style={[{fontSize:8, flex: 0.9}]}>{`No member will be permitted to suffer total deduction (including Savings, Loan repayment and interest) in excess of two thirds of his/her basic salary/income.`}</Text>
                </View>
                <View style={[{flex:0.05, flexDirection: "row", marginTop: 2, marginBottom: 5}]}>
                  <Text style={[{fontSize:8, width:10}]}>5. </Text>
                  <Text style={[{fontSize:8, flex: 0.9}]}>{`A member will be required to maintain a monthly share/deposit contribution depending on loan repayment period and loan amount contribution subject to the current requirements based on loan applied for and the repayment period.`}</Text>
                </View>
                <View style={[{flex:0.05, flexDirection: "row", marginTop: 2, marginBottom: 5}]}>
                  <Text style={[{fontSize:8, width:10}]}>6. </Text>
                  <Text style={[{fontSize:8, flex: 0.9}]}>{`Outstanding loans must have been cleared before a new loan is granted OR as per the standing policy guiding respective loan products. Members must read and adhere to loan conditions of respective products.`}</Text>
                </View>
                <View style={[{flex:0.05, flexDirection: "row", marginTop: 2, marginBottom: 5}]}>
                  <Text style={[{fontSize:8, width:10}]}>7. </Text>
                  <Text style={[{fontSize:8, flex: 0.9}]}>{`Members must have contributed for a minimum period of six consecutive months having a minimum share of 3% of once basic salary or Ug Shs 120,000 whichever is higher.`}</Text>
                </View>
                <View style={[{flex:0.05, flexDirection: "row", marginTop: 2, marginBottom: 5}]}>
                  <Text style={[{fontSize:8, width:10}]}>8. </Text>
                  <Text style={[{fontSize:8, flex: 0.9}]}>{`Emergency and school fees loans will be granted with a maximum repayment of 6 months and must be supported by documentary evidence. School fees loans shall be paid directly to the school.`}</Text>
                </View>
                <View style={[{flex:0.035, flexDirection: "row", marginTop: 2, marginBottom: 5}]}>
                  <Text style={[{fontSize:8, width:10}]}>9. </Text>
                  <Text style={[{fontSize:8, flex: 0.9}]}>{`The guarantors must be members of Bweyogerere Tuberebumu Sacco.`}</Text>
                </View>
                <View style={[{flex:0.035, flexDirection: "row", marginTop: 2, marginBottom: 5}]}>
                  <Text style={[{fontSize:8, width:14}]}>10. </Text>
                  <Text style={[{fontSize:8, flex: 0.9}]}>{`Lump sum contribution for the purpose of securing a loan shall be considered only if such money
      remains in the Sacco for at least six (6) months.`}</Text>
                </View>
                <View style={[{flex:0.035, flexDirection: "row", marginTop: 2, marginBottom: 5}]}>
                  <Text style={[{fontSize:8, width:14}]}>11. </Text>
                  <Text style={[{fontSize:8, flex: 0.9}]}>{`Lump sum loan repayment for the purpose of borrowing a new loan will have to wait for a period
      of three (3) months.`}</Text>
                </View>
                <View style={[{flex:0.035, flexDirection: "row", marginTop: 2, marginBottom: 5}]}>
                  <Text style={[{fontSize:8, width:14}]}>12. </Text>
                  <Text style={[{fontSize:8, flex: 0.9}]}>{`The amount of loan taken is subject to an interest of 3% per month charged as per reducing
      balance of the total amount taken with an exception of payment of only one (1) month from the time the money is given out plus a maximum payback period of ten (10) months. Note; Loan application fee of Shs 10,000 and process fee of 1% shall be paid as well.`}</Text>
                </View>
                <View style={[{flex:0.035, flexDirection: "row", marginTop: 2, marginBottom: 5}]}>
                  <Text style={[{fontSize:8, width:14}]}>13. </Text>
                  <Text style={[{fontSize:8, flex: 0.9}]}>{`A member who withdraws from the society and rejoins later will be treated as a new member for the purpose of this loan policy.`}</Text>
                </View>
                <View style={[{flex:0.05, flexDirection: "row", marginTop: 2, marginBottom: 5}]}>
                  <Text style={[{fontSize:8, width:14}]}>14. </Text>
                  <Text style={[{fontSize:8, flex: 0.9}]}>{`Employees of a SACCO society shall be eligible for membership but are not eligible to become members of a management committee or any other sub-committee in the same society.`}</Text>
                </View>
                <View style={[{flex:0.05, flexDirection: "row", marginTop: 2, marginBottom: 5}]}>
                  <Text style={[{fontSize:8, width:14}]}>15. </Text>
                  <Text style={[{fontSize:8, flex: 0.9}]}>{`Loans for senior management staff shall be approved by the full management committee only. The loans officer shall be constantly monitoring the performance of loans granted to the society employees.`}</Text>
                </View>
                <View style={[{flex:0.05, flexDirection: "row", marginTop: 2, marginBottom: 5}]}>
                  <Text style={[{fontSize:8, width:14}]}>16. </Text>
                  <Text style={[{fontSize:8, flex: 0.9}]}>{`Loans will be granted according to the applicant’s qualifications based on character, ability to repay and in observance of applicable laws, rules and regulation.`}</Text>
                </View>
                <View style={[{flex:0.035, flexDirection: "row", marginTop: 2, marginBottom: 5}]}>
                  <Text style={[{fontSize:8, width:14}]}>17. </Text>
                  <Text style={[{fontSize:8, flex: 0.9}]}>{`The Society reserves the right to grant or deny a loan despite the formula based on eligibility.`}</Text>
                </View>
                <View style={[{flex:0.15, flexDirection: "row", marginTop: 2, marginBottom: 5}]}>
                  <Text style={[{fontSize:8, width:14}]}>18. </Text>
                  <Text style={[{fontSize:8, flex: 0.9}]}>{`In  case of default in payment, the entire balance of the loan will immediately become due and payable at the discretion of the Board and all shares owned by the member and any interest and  deposits will due to the member will be off set against owned amount. The member will also be liable for any costs incurred in the collection by the debt collector for the loan balance and accumulated interest. Any remaining balance will be deducted from member’s salary or terminal benefits and the employer is authorized to make all necessary deduction by authority of the member’s signature appended below.`}</Text>
                </View>
                <View style={[{flex:0.05, flexDirection: "row", marginTop: 2, marginBottom: 5}]}>
                  <Text style={[{fontSize:8, width:14}]}>19. </Text>
                  <Text style={[{fontSize:8, flex: 0.9}]}>{`In case the loan is fully paid before the agreed period (below 50% of the total months) previously requested; the borrower shall be charged 50% of the remaining interest.`}</Text>
                </View>
              </View>
            </View>
            {/* End */}        
          </View>

          {/* page number */}
          <Text style={[{textAlign: 'center', width: "100%", fontSize: 8, position:'absolute', bottom: 15}]} render={({pageNumber, totalPages}) => (
            `Page ${pageNumber} of ${totalPages}`
          )}/>
          <Text style={[{textAlign: 'left', width: "100%", fontSize: 8, position:'absolute', bottom:15, paddingLeft:15}]}>Revised: 19.06.2016</Text> 
          
        </View>
      </Page>
      <Page style={[{ position: 'relative' } ]}>
        <View style={[{flex: 1, justifyContent: 'center', alignItems:'center', width: "100%", height:"100%"}]}>
          {/* Water mark */}
          <View style={[{height: 200, width: 200, flex: 1, justifyContent: 'center', alignItems: 'center', position: "absolute", zIndex: 1}]}>
            <Image src={logo} style={[{opacity: 0.3, width: 150, height: 150, marginBottom: -20}]} />
            <Text style={[{fontSize: 8, opacity: 0.3}]}>BWEYOGERERE TUBEREBUMU CO-OPERATIVE</Text>
            <Text style={[{fontSize: 8, opacity:0.3}]}>SAVING AND CREDIT SOCIETY LTD</Text>
          </View>
          <View style={[{position:'absolute', zIndex: 2, height: "100%", width: "100%"}]}>
            {/* This is where the content of the application form goes. */}
            {/* Begin */}
            <View style={styles.body}>
              <View style={[{paddingHorizontal:15, height:600 }]} >
                <View style={[{flex:0.035, flexDirection: "row", marginTop: 2, marginBottom: 5}]}>
                  <Text style={[{fontSize:8, width:14}]}>20. </Text>
                  <Text style={[{fontSize:8, flex: 0.9}]}>{`In case the member delays to repay the monthly fee as per this loan agreement, he/she shall pay an extra 50% of the interest of that month.`}</Text>
                </View>
                <View style={[{flex:0.035, flexDirection: "row", marginTop: 2, marginBottom: 5}]}>
                  <Text style={[{fontSize:8, width:14}]}>21. </Text>
                  <Text style={[{fontSize:8, flex: 0.9}]}>{`The borrower shall be required to pay interest and not less than 50% of the Sacco money to be returned every month.`}</Text>
                </View>         
                <View style={[{flex:0.05, flexDirection: "row", marginTop: 2, marginBottom: 5}]}>
                  <Text style={[{fontSize:8, width:14}]}>22. </Text>
                  <Text style={[{fontSize:8, flex: 0.9}]}>{`Application must be received in the Sacco’s office on or before 10th of every month or last working day of 10th falls on a weekend or Public holiday. Attached shall be ; filled in loan application (picked from secretary or downloaded from Sacco facebook group; link from: https://www.facebook.com/groups/404767256339820/files/) , photocopies of member’s Sacco identification card, a statement of the member’s transaction with Sacco, and photocopy of filled in fields of the log book.`}</Text>
                </View> 
                <View style={[{flex:0.05, flexDirection: "row", marginTop: 2, marginBottom: 5}]}>
                  <Text style={[{fontSize:8, width:14}]}>23. </Text>
                  <Text style={[{fontSize:8, flex: 0.9}]}>{`All Sacco deposits to be made in any DFCU Bank Branch to the Sacco account number 01071113177640 in the names of Bweyogerere Tuberebumu Sacco.`}</Text>
                </View> 
                <Text style={{fontSize:9, flex: 0.035}}>SIGNED</Text> 
                <Text style={{fontSize:8, flex:0.025}}>Applicant's</Text>
                <View style={[{flex:0.025, flexDirection: "row", justifyContent:"space-between"}]}>
                  <View style={{flex: 2, flexDirection:"row", alignItems:"flex-end"}}>
                    <Text style={{fontSize: 8}}>Name: </Text>
                    <Text style={{fontSize: 8, borderBottom: "dotted", borderBottomWidth:1, borderBottomColor: "black", flex: 1}}>{applicant_name || "        "}</Text>
                  </View>
                  <View style={{flex: 1, flexDirection:"row", alignItems:"flex-end"}}>
                    <Text style={{fontSize: 8}}>Date: </Text>
                    <Text style={{fontSize: 8, borderBottom: "dotted", borderBottomWidth:1, borderBottomColor: "black", flex: 1}}>{moment().format("DD/MM/YYYY")}</Text>
                  </View>
                </View>
              </View>
            </View>
            {/* End */}        
          </View>

          {/* page number */}
          <Text style={[{textAlign: 'center', width: "100%", fontSize: 8, position:'absolute', bottom: 15}]} render={({pageNumber, totalPages}) => (
            `Page ${pageNumber} of ${totalPages}`
          )}/>
          <Text style={[{textAlign: 'left', width: "100%", fontSize: 8, position:'absolute', bottom:15, paddingLeft:15}]}>Revised: 19.06.2016</Text> 
          
        </View>
      </Page>
      <Page style={[{ position: 'relative' } ]}>
        <View style={[{flex: 1, justifyContent: 'center', alignItems:'center', width: "100%", height:"100%"}]}>
          {/* Water mark */}
          <View style={[{height: 200, width: 200, flex: 1, justifyContent: 'center', alignItems: 'center', position: "absolute", zIndex: 1}]}>
            <Image src={logo} style={[{opacity: 0.3, width: 150, height: 150, marginBottom: -20}]} />
            <Text style={[{fontSize: 8, opacity: 0.3}]}>BWEYOGERERE TUBEREBUMU CO-OPERATIVE</Text>
            <Text style={[{fontSize: 8, opacity:0.3}]}>SAVING AND CREDIT SOCIETY LTD</Text>
          </View>
          <View style={[{position:'absolute', zIndex: 2, height: "100%", width: "100%"}]}>
            {/* This is where the content of the application form goes. */}
            {/* Begin */}
            <View style={[{ paddingTop: 25, paddingBottom: 25, paddingHorizontal: 35, flex: 1 }]}>
              <View style={[{height: 40}]}>
                <Text style={[{fontSize: 10, borderBottom: "solid", marginBottom:10, textDecoration: "underline"}]}>G. FOR OFFICIAL USE ONLY</Text>
                <Text style={[{fontSize: 10, marginBottom: 10}]}> ELIGIBILITY CALCULATIONS</Text>
              </View>
              <View style={[{flex: 1}]}>
                <View style={[{marginHorizontal:15, height:200}]}>
                  <View style={[{flex:0.1, flexDirection: "row", justifyContent:"space-between"}]}>
                    <View style={{flex: 1, flexDirection:"row", alignItems:"flex-end"}}>
                      <Text style={{width: 10, fontSize: 8}}>1. </Text>
                      <Text style={{fontSize: 8}}>Total Shares (UG Shs)</Text>
                      <Text style={{fontSize: 8, borderBottom: "dotted", borderBottomWidth:1, borderBottomColor: "black", flex: 1, paddingLeft: 4}}>{accountsInformation?.shares?.balance ? `UGX ${currencyFormatter(accountsInformation.shares.balance)}` : "UGX 0"}</Text>
                    </View>
                  </View>
                  <View style={[{flex:0.1, flexDirection: "row", justifyContent:"space-between"}]}>
                    <View style={{flex: 1, flexDirection:"row", alignItems:"flex-end"}}>
                      <Text style={{width: 10, fontSize: 8}}>2. </Text>
                      <Text style={{fontSize: 8}}>Total Savings (UG Shs)</Text>
                      <Text style={{fontSize: 8, borderBottom: "dotted", borderBottomWidth:1, borderBottomColor: "black", flex: 1, paddingLeft: 4}}>{accountsInformation?.savings?.balance ? `UGX ${currencyFormatter(accountsInformation.savings.balance)}` : "UGX 0"}</Text>
                    </View>
                  </View>
                  <View style={[{flex:0.1, flexDirection: "row", justifyContent:"space-between"}]}>
                    <View style={{flex: 1, flexDirection:"row", alignItems:"flex-end"}}>
                      <Text style={{width: 10, fontSize: 8}}>3. </Text>
                      <Text style={{fontSize: 8}}>Maximum Credit (1-2) Ug Shs</Text>
                      <Text style={{fontSize: 8, borderBottom: "dotted", borderBottomWidth:1, borderBottomColor: "black", flex: 1, paddingLeft: 4}}>{`UGX ${currencyFormatter(accountsInformation?.shares?.balance * 2)}`}</Text>
                    </View>
                  </View>
                  <View style={[{flex:0.1, flexDirection: "row", justifyContent:"space-between"}]}>
                    <View style={{flex: 1, flexDirection:"row", alignItems:"flex-end"}}>
                      <Text style={{width: 10, fontSize: 8}}>4. </Text>
                      <Text style={{fontSize: 8}}>Amount currently requested (UG Shs)</Text>
                      <Text style={{fontSize: 8, borderBottom: "dotted", borderBottomWidth:1, borderBottomColor: "black", flex: 1, paddingLeft: 4}}>{`UGX ${currencyFormatter(amount)}`}</Text>
                    </View>
                  </View>
                  <View style={[{flex:0.1, flexDirection: "row", justifyContent:"space-between"}]}>
                    <View style={{flex: 1, flexDirection:"row", alignItems:"flex-end"}}>
                      <Text style={{width: 10, fontSize: 8}}>5. </Text>
                      <Text style={{fontSize: 8}}>Member's basic salary (UG Shs)</Text>
                      <Text style={{fontSize: 8, borderBottom: "dotted", borderBottomWidth:1, borderBottomColor: "black", flex: 1, paddingLeft: 4}}>{`UGX ${currencyFormatter(business_income)} annually` || "Not specified"}</Text>
                    </View>
                  </View>
                  <View style={[{flex:0.1, flexDirection: "row", justifyContent:"space-between"}]}>
                    <View style={{flex: 1, flexDirection:"row", alignItems:"flex-end"}}>
                      <Text style={{width: 10, fontSize: 8}}>6. </Text>
                      <Text style={{fontSize: 8}}>Recurrent deductions including new loan (Ug Shs)</Text>
                      <Text style={{fontSize: 8, borderBottom: "dotted", borderBottomWidth:1, borderBottomColor: "black", flex: 1, paddingLeft: 4}}>{"         "}</Text>
                    </View>
                  </View>
                  <View style={[{flex:0.1, flexDirection: "row", justifyContent:"space-between"}]}>
                    <View style={{flex: 1, flexDirection:"row", alignItems:"flex-end"}}>
                      <Text style={{width: 10, fontSize: 8}}>7. </Text>
                      <Text style={{fontSize: 8}}>Two-thirds of Basic Salary (Basic Salary /3 x 2 or Net income x 0.66)</Text>
                      <Text style={{fontSize: 8, borderBottom: "dotted", borderBottomWidth:1, borderBottomColor: "black", flex: 1, paddingLeft: 4}}>{business_income ? `UGX ${currencyFormatter(business_income)}` : "Can't be determined"}</Text>
                    </View>
                  </View>
                  <View style={[{flex:0.1, flexDirection: "row", justifyContent:"space-between"}]}>
                    <View style={{flex: 1, flexDirection:"row", alignItems:"flex-end"}}>
                      <Text style={{width: 10, fontSize: 8}}>8. </Text>
                      <Text style={{fontSize: 8}}>Amount Recommended (Ug Shs)</Text>
                      <Text style={{fontSize: 8, borderBottom: "dotted", borderBottomWidth:1, borderBottomColor: "black", flex: 1, paddingLeft: 4}}>{"         " }</Text>
                    </View>
                  </View>
                  <View style={[{flex:0.1, flexDirection: "row", justifyContent:"space-between"}]}>
                    <View style={{flex: 1, flexDirection:"row", alignItems:"flex-end"}}>
                      <Text style={{width: 10, fontSize: 8}}>9. </Text>
                      <Text style={{fontSize: 8}}>Amount repayable within</Text>
                      <Text style={{fontSize: 8, borderBottom: "dotted", borderBottomWidth:1, borderBottomColor: "black", flex: 1, paddingLeft: 4}}>{"         "}</Text>
                    </View>
                  </View>
      
                </View>
                <View style={[{height: 50, marginHorizontal: 15}]}>
                  <Text style={[{fontSize: 8, marginBottom:10}]}>The guarantors can cover the loan amount {""}</Text>
                  <Text style={[{fontSize: 8, marginBottom: 5}]}>I certify that the application is/is not within the Rules of th Sacco. If not, state Why</Text>
                  <Text style={[{borderBottom: "dotted", borderBottomWidth: 1, borderBottomColor:"black", width:"100%", fontSize:8}]}>{"         "}</Text>
                </View>
                
                <Text style={[{fontSize: 8, paddingVertical:2, paddingHorizontal:15}]}>(Computation)</Text>
                
                <View style={[{height: 60, marginHorizontal:15, marginBottom: 15}]}>
                  <View style={[{flex: 1, flexDirection:"row"}]}>
                    <View style={{flex: 1, flexDirection:"row", alignItems:"flex-end"}}>
                      <Text style={{width: 10, fontSize: 8}}>1. </Text>
                      <Text style={{fontSize: 8}}>Total Shares</Text>
                      <Text style={{fontSize: 8, borderBottom: "dotted", borderBottomWidth:1, borderBottomColor: "black", flex: 1, paddingLeft: 4}}>{"          "}</Text>
                    </View>
                    <View style={{flex: 1, flexDirection:"row", alignItems:"flex-end"}}>
                      <Text style={{width: 10, fontSize: 8}}>2. </Text>
                      <Text style={{fontSize: 8}}>Loan applied for</Text>
                      <Text style={{fontSize: 8, borderBottom: "dotted", borderBottomWidth:1, borderBottomColor: "black", flex: 1, paddingLeft: 4}}>{"          "}</Text>
                    </View>
                  </View>
                  <View style={[{ flex: 1, flexDirection:"row"}]}>
                    <View style={{flex: 1, flexDirection:"row", alignItems:"flex-end"}}>
                      <Text style={{width: 10, fontSize: 8}}>3. </Text>
                      <Text style={{fontSize: 8}}>Loan outstanding</Text>
                      <Text style={{fontSize: 8, borderBottom: "dotted", borderBottomWidth:1, borderBottomColor: "black", flex: 1, paddingLeft: 4}}>{"           "}</Text>
                    </View>
                    <View style={{flex: 1, flexDirection:"row", alignItems:"flex-end"}}>
                      <Text style={{width: 10, fontSize: 8}}>4. </Text>
                      <Text style={{fontSize: 8}}>Amount entitled</Text>
                      <Text style={{fontSize: 8, borderBottom: "dotted", borderBottomWidth:1, borderBottomColor: "black", flex: 1, paddingLeft: 4}}>{"          "}</Text>
                    </View>
                  </View>
                  <View style={[{ flex: 1, flexDirection:"row"}]}>
                    <View style={{flex: 1, flexDirection:"row", alignItems:"flex-end"}}>
                      <Text style={{width: 10, fontSize: 8}}>5. </Text>
                      <Text style={{fontSize: 8}}>Value of Security</Text>
                      <Text style={{fontSize: 8, borderBottom: "dotted", borderBottomWidth:1, borderBottomColor: "black", flex: 1, paddingLeft: 4}}>{"           "}</Text>
                    </View>
                  </View> 
                </View>

                <Text style={[{fontSize:8, marginBottom: 5}]}>Note: If the value of the security is less than the desired amount no loan should be issued out to the borrower or if the borrower has an outstanding loan.</Text>
                <View style={[{height: 25}]}>
                  <View style={[{flex: 1}]}>
                    <Text style={[{fontSize:8, flex: 1}]} render={() => {
                      return (
                        <View>
                          I certify that the information regarding shares, outstanding loan and gurantors detail is correct as per the attached document and recommend/ approve a loan Ug Shs 
                          <Text style={{textDecoration:"underline", textDecorationStyle:"dotted", paddingHorizontal: 5, width:120}}>{"       "}{amount > 0 ? `UGX ${currencyFormatter(amount)}` : "          "}{"       "}</Text>(in figures)
                        </View>
                        )
                    }}/>
                  </View>
                </View>
              
                
                
                
              </View>
              <View style={[{flex: 1}]}>
                <View style={[{flex: 0.04, flexDirection:"row", alignItems: 'flex-end', marginBottom: 5}]}>
                  <Text style={{fontSize: 8, width: 30}}>In words</Text>
                  <Text style={[{fontSize: 8, borderBottom: "dotted", borderBottomWidth:1, borderBottomColor: "black", flex: 1, paddingLeft: 2}]}>{amount_in_words}</Text>
                </View>
                <View style={[{flex: 0.04, flexDirection:"row", alignItems: 'flex-end', marginBottom: 10}]}>
                  <View style={[{ flex: 1, flexDirection:"row"}]}>
                    <View style={{flex: 1, flexDirection:"row", alignItems:"flex-end"}}>
                      <Text style={{fontSize: 8}}>Loan officer</Text>
                      <Text style={{fontSize: 8, borderBottom: "dotted", borderBottomWidth:1, borderBottomColor: "black", flex: 1, paddingLeft: 4}}>{"                "}</Text>
                    </View>
                    <View style={{flex: 1, flexDirection:"row", alignItems:"flex-end"}}>
                      <Text style={{fontSize: 8}}>Designation</Text>
                      <Text style={{fontSize: 8, borderBottom: "dotted", borderBottomWidth:1, borderBottomColor: "black", flex: 1, paddingLeft: 4}}>{"                "}</Text>
                    </View>
                  </View>
                </View>
                <View style={[{flex: 0.25, alignContent:'space-between'}]}>
                  <Text style={[{fontSize: 9}]}>Comments</Text>
                  <Text style={[{fontSize: 8, borderBottom:"dotted", borderBottomWidth:1, borderBottomColor:"black", marginVertical:3}]}>{"         "}</Text>
                  <Text style={[{fontSize: 8, borderBottom:"dotted", borderBottomWidth:1, borderBottomColor:"black", marginVertical:3}]}>{"         "}</Text>
                  <Text style={[{fontSize: 8, borderBottom:"dotted", borderBottomWidth:1, borderBottomColor:"black", marginVertical:3}]}>{"         "}</Text>
                </View>
                <Text style={[{fontSize: 9, marginVertical: 5}]}>CREDIT COMMITTEE</Text>
                <View style={[{height: 15}]}>
                  <View style={[{flex: 1}]}>
                    <Text style={[{fontSize:8, flex: 1}]} render={() => {
                      return (
                        <View>
                          Advance approved in UG SHS
                          <Text style={{textDecoration:"underline", textDecorationStyle:"dotted", paddingHorizontal: 5, width:120}}>{"  "}{"    "}{"  "}</Text>
                          Recovered in 
                          <Text style={{textDecoration:"underline", textDecorationStyle:"dotted", paddingHorizontal: 5, width:120}}>{"  "}{"    "}{"  "}</Text>
                          months payable at once as per the schedule (interest on straight line)
                        </View>
                        )
                    }}/>
                  </View>
                </View>
                <View style={[{flex: 0.04, flexDirection:"row", alignItems: 'flex-end', marginBottom: 5}]}>
                  <Text style={{fontSize: 8, width: 20}}>Date</Text>
                  <Text style={[{fontSize: 8, borderBottom: "dotted", borderBottomWidth:1, borderBottomColor: "black", flex: 1, paddingLeft: 2}]}>{"    "}</Text>
                </View>
                <Text style={[{fontSize: 9, marginVertical: 5}]}>SIGNATURES</Text>
                <View style={[{height: 60}]}>
                  <View style={[{flex: 1, flexDirection:"row"}]}>
                    <View style={{flex: 2, flexDirection:"row", alignItems:"flex-end"}}>
                      <Text style={{fontSize: 8}}>Loan officer</Text>
                      <Text style={{fontSize: 8, borderBottom: "dotted", borderBottomWidth:1, borderBottomColor: "black", flex: 1, paddingLeft: 4}}>{"          "}</Text>
                    </View>
                    <View style={{flex: 1, flexDirection:"row", alignItems:"flex-end"}}>
                      <Text style={{fontSize: 8}}>Signature</Text>
                      <Text style={{fontSize: 8, borderBottom: "dotted", borderBottomWidth:1, borderBottomColor: "black", flex: 1, paddingLeft: 4}}>{"          "}</Text>
                    </View>
                    <View style={{flex: 1, flexDirection:"row", alignItems:"flex-end"}}>
                      <Text style={{fontSize: 8}}>Date</Text>
                      <Text style={{fontSize: 8, borderBottom: "dotted", borderBottomWidth:1, borderBottomColor: "black", flex: 1, paddingLeft: 4}}>{"          "}</Text>
                    </View>
                  </View>
                  <View style={[{ flex: 1, flexDirection:"row"}]}>
                    <View style={{flex: 2, flexDirection:"row", alignItems:"flex-end"}}>
                      <Text style={{fontSize: 8}}>General Manager/ Accountant</Text>
                      <Text style={{fontSize: 8, borderBottom: "dotted", borderBottomWidth:1, borderBottomColor: "black", flex: 1, paddingLeft: 4}}>{"           "}</Text>
                    </View>
                    <View style={{flex: 1, flexDirection:"row", alignItems:"flex-end"}}>
                      <Text style={{fontSize: 8}}>Signature</Text>
                      <Text style={{fontSize: 8, borderBottom: "dotted", borderBottomWidth:1, borderBottomColor: "black", flex: 1, paddingLeft: 4}}>{"          "}</Text>
                    </View>
                    <View style={{flex: 1, flexDirection:"row", alignItems:"flex-end"}}>
                      <Text style={{fontSize: 8}}>Date</Text>
                      <Text style={{fontSize: 8, borderBottom: "dotted", borderBottomWidth:1, borderBottomColor: "black", flex: 1, paddingLeft: 4}}>{"          "}</Text>
                    </View>
                  </View>
                  <View style={[{ flex: 1, flexDirection:"row"}]}>
                    <View style={{flex: 2, flexDirection:"row", alignItems:"flex-end"}}>
                      <Text style={{fontSize: 8}}>Credit Chairman</Text>
                      <Text style={{fontSize: 8, borderBottom: "dotted", borderBottomWidth:1, borderBottomColor: "black", flex: 1, paddingLeft: 4}}>{"           "}</Text>
                    </View>
                    <View style={{flex: 1, flexDirection:"row", alignItems:"flex-end"}}>
                      <Text style={{fontSize: 8}}>Signature</Text>
                      <Text style={{fontSize: 8, borderBottom: "dotted", borderBottomWidth:1, borderBottomColor: "black", flex: 1, paddingLeft: 4}}>{"           "}</Text>
                    </View>
                    <View style={{flex: 1, flexDirection:"row", alignItems:"flex-end"}}>
                      <Text style={{fontSize: 8}}>Date</Text>
                      <Text style={{fontSize: 8, borderBottom: "dotted", borderBottomWidth:1, borderBottomColor: "black", flex: 1, paddingLeft: 4}}>{"          "}</Text>
                    </View>
                  </View> 
                </View>
                

              </View>
            </View>
            {/* End */}        
          </View>

          {/* page number */}
          <Text style={[{textAlign: 'center', width: "100%", fontSize: 8, position:'absolute', bottom: 15}]} render={({pageNumber, totalPages}) => (
            `Page ${pageNumber} of ${totalPages}`
          )}/>
          <Text style={[{textAlign: 'left', width: "100%", fontSize: 8, position:'absolute', bottom:15, paddingLeft:15}]}>Revised: 19.06.2016</Text> 
        </View>
      </Page>
      {/* Transformed */}
    

      {/* Water marked Template */}
      <Page style={[{ position: 'relative' } ]}>
        <View style={[{flex: 1, justifyContent: 'center', alignItems:'center', width: "100%", height:"100%"}]}>
          {/* Water mark */}
          <View style={[{height: 200, width: 200, flex: 1, justifyContent: 'center', alignItems: 'center', position: "absolute", zIndex: 1}]}>
            <Image src={logo} style={[{opacity: 0.3, width: 150, height: 150, marginBottom: -20}]} />
            <Text style={[{fontSize: 8, opacity: 0.3}]}>BWEYOGERERE TUBEREBUMU CO-OPERATIVE</Text>
            <Text style={[{fontSize: 8, opacity:0.3}]}>SAVING AND CREDIT SOCIETY LTD</Text>
          </View>
          <View style={[{position:'absolute', zIndex: 2, height: "100%", width: "100%"}]}>
            {/* This is where the content of the application form goes. */}
            <View style={[styles.body]}>
              {/* Begin */}
                <Text style={[{fontSize: 9, marginVertical: 5}]}>OFFER ACCEPTANCE (BORROWER)</Text>
                <View style={[{height: 20}]}>
                  <View style={[{flex: 1}]}>
                    <Text style={[{fontSize:8, flex: 1}]} render={() => {
                      return (
                        <View>
                          I{" "}{applicant_name}{" "} accept a loan amounting to UG Shs  
                          <Text style={{textDecoration:"underline", textDecorationStyle:"dotted", paddingHorizontal: 5, width:120}}>{" "}{currencyFormatter(amount)}{"       "}</Text>
                          in words
                          <Text style={{textDecoration:"underline", textDecorationStyle:"dotted", paddingHorizontal: 5, width:120}}>{" "}{"    "}{"  "}</Text>
                          charged at an interest rate of 
                          <Text style={{textDecoration:"underline", textDecorationStyle:"dotted", paddingHorizontal: 5, width:120}}>{"  "}{` 3 % `}{"  "}</Text>
                          to be paid within 
                          <Text style={{textDecoration:"underline", textDecorationStyle:"dotted", paddingHorizontal: 5, width:120}}>{"  "}{`${months}`}{"  "}</Text>
                          months and to be not less than Ug Shs
                          <Text style={{textDecoration:"underline", textDecorationStyle:"dotted", paddingHorizontal: 5, width:120}}>{" "}{amortization_schedule[0]?.principal_installment ? `UGX ${currencyFormatter(amortization_schedule[0]?.principal_installment)}` : "      "}{"       "}</Text>
                          per month.
                        </View>
                        )
                    }}/>
                  </View>
                </View>
                <View style={[{height: 60}]}>
                  <View style={[{flex: 1, flexDirection:"row"}]}>
                    <View style={{flex: 1, flexDirection:"row", alignItems:"flex-end"}}>
                      <Text style={{fontSize: 8}}>Name</Text>
                      <Text style={{fontSize: 8, borderBottom: "dotted", borderBottomWidth:1, borderBottomColor: "black", flex: 1, paddingLeft: 4}}>{"          "}</Text>
                    </View>
                    <View style={{flex: 1, flexDirection:"row", alignItems:"flex-end"}}>
                      <Text style={{fontSize: 8}}>Signature</Text>
                      <Text style={{fontSize: 8, borderBottom: "dotted", borderBottomWidth:1, borderBottomColor: "black", flex: 1, paddingLeft: 4}}>{"          "}</Text>
                    </View>
                  </View>
                  <View style={[{ flex: 1, flexDirection:"row"}]}>
                    <View style={{flex: 1, flexDirection:"row", alignItems:"flex-end"}}>
                      <Text style={{fontSize: 8}}>Witnessed by</Text>
                      <Text style={{fontSize: 8, borderBottom: "dotted", borderBottomWidth:1, borderBottomColor: "black", flex: 1, paddingLeft: 4}}>{"          "}</Text>
                    </View>
                    <View style={{flex: 1, flexDirection:"row", alignItems:"flex-end"}}>
                      <Text style={{fontSize: 8}}>ID No</Text>
                      <Text style={{fontSize: 8, borderBottom: "dotted", borderBottomWidth:1, borderBottomColor: "black", flex: 1, paddingLeft: 4}}>{"          "}</Text>
                    </View>
                    <View style={{flex: 1, flexDirection:"row", alignItems:"flex-end"}}>
                      <Text style={{fontSize: 8}}>Membership No</Text>
                      <Text style={{fontSize: 8, borderBottom: "dotted", borderBottomWidth:1, borderBottomColor: "black", flex: 1, paddingLeft: 4}}>{"          "}</Text>
                    </View>
                  </View>
                  <View style={[{ flex: 1, flexDirection:"row"}]}>
                    <View style={{flex: 1, flexDirection:"row", alignItems:"flex-end"}}>
                      <Text style={{fontSize: 8}}>Signature</Text>
                      <Text style={{fontSize: 8, borderBottom: "dotted", borderBottomWidth:1, borderBottomColor: "black", flex: 1, paddingLeft: 4}}>{"           "}</Text>
                    </View>
                    <View style={{flex: 1, flexDirection:"row", alignItems:"flex-end"}}>
                      <Text style={{fontSize: 8}}>Date</Text>
                      <Text style={{fontSize: 8, borderBottom: "dotted", borderBottomWidth:1, borderBottomColor: "black", flex: 1, paddingLeft: 4}}>{"          "}</Text>
                    </View>
                  </View> 
                </View>
                
                <Text style={[{fontSize: 9, marginVertical: 5}]}>H. LOAN PAYMENT SCHEDULE</Text>
                {
                  <View style={[{marginTop: 15, marginBottom: 15}]}>
                    <View style={[{height: 20}]}>
                      <View style={[{flex: 1, borderBottom: "solid", borderBottomWidth: 1, borderBottomColor: "black", flexDirection:"row", borderTop: "solid", borderTopWidth: 1, borderTopColor: "black", borderRight:"solid", borderRightWidth: 1, borderRightColor: "black", borderLeft: "solid", borderLeftWidth:1, borderLeftColor:"black"}]}>
                        <Text style={[{flex:1, fontSize:8, borderRight: "solid", borderRightWidth: 1, borderRightColor: "black", paddingLeft: 5}]}>Period(months)</Text>
                        <Text style={[{flex:1, fontSize:8, borderRight: "solid", borderRightWidth: 1, borderRightColor: "black", paddingLeft: 5}]}>Principal</Text>
                        <Text style={[{flex:1, fontSize:8, borderRight: "solid", borderRightWidth: 1, borderRightColor: "black", paddingLeft: 5}]}>Amount paid</Text>
                        <Text style={[{flex:1, fontSize:8, borderRight: "solid", borderRightWidth: 1, borderRightColor: "black", paddingLeft: 5}]}>Interest (% of Standing Balance)</Text>
                        <Text style={[{flex:1, fontSize:8, paddingLeft:5}]}>Balance Due</Text>
                      </View>
                    </View>
                    {
                      amortization_schedule.map((payment, index) => {
                        return (
                          <View key={index} style={[{height: 12}]}>
                            <View style={[{flex: 1, borderBottom: "solid", borderBottomWidth: 1, borderBottomColor: "black", flexDirection:"row", borderRight:"solid", borderRightWidth: 1, borderRightColor: "black", borderLeft: "solid", borderLeftWidth:1, borderLeftColor:"black"}]}>
                              <Text style={[{flex:1, fontSize:8, borderRight: "solid", borderRightWidth: 1, borderRightColor: "black", paddingLeft: 5}]}>{payment.month}</Text>
                              <Text style={[{flex:1, fontSize:8, borderRight: "solid", borderRightWidth: 1, borderRightColor: "black", paddingLeft: 5}]}>{payment.principal_installment}</Text>
                              <Text style={[{flex:1, fontSize:8, borderRight: "solid", borderRightWidth: 1, borderRightColor: "black", paddingLeft: 5}]}>{0}</Text>
                              <Text style={[{flex:1, fontSize:8, borderRight: "solid", borderRightWidth: 1, borderRightColor: "black", paddingLeft: 5}]}>{payment.reducing_balance}</Text>
                              <Text style={[{flex:1, fontSize:8, paddingLeft:5}]}>{payment.repayment_amount}</Text>
                            </View>
                          </View>
                        )
                      })
                    }
                  </View>
                }





              {/* End */}        
            </View>
          </View>
          {/* page number */}
          <Text style={[{textAlign: 'center', width: "100%", fontSize: 8, position:'absolute', bottom: 15}]} render={({pageNumber, totalPages}) => (
            `Page ${pageNumber} of ${totalPages}`
          )}/>
          <Text style={[{textAlign: 'left', width: "100%", fontSize: 8, position:'absolute', bottom:15, paddingLeft:15}]}>Revised: 19.06.2016</Text> 
        </View>
      </Page>  
    </Document>
  )
}

export default LoanPDF
