import React from 'react'
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
import { MdOutlineCheckBox, MdOutlineCheckBoxOutlineBlank } from 'react-icons/md';




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

function LoanPDF({values}) {
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
    guarantors

  } = values



  console.log(values)
  return (
    <Document>
      <Page style={styles.body}>
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
              <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>David Derrick Anyuru</Text>
            </View>
            <View style={[{flex: 1, padding:2}]}>
              <Text style={[{fontSize:8, paddingRight: 2}]}>Nationality: </Text>
              <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>Ugandan</Text>
            </View>
            <View style={[{flex: 1, padding:2}]}>
              <Text style={[{fontSize:8, paddingRight: 2}]}>Member ID: </Text>
              <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>TUBE 00523001</Text>
            </View>
            <View style={[{flex: 1, padding:2}]}>
              <Text style={[{fontSize:8, paddingRight: 2}]}>Postal Address: </Text>
              <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>27764 K'LA</Text>
            </View>
          </View>
        </View>

        {/* Line 2 */}
        <View style={[{height:40, marginTop:5, marginBottom:5}]}>
          <View style={[{flex: 1, flexDirection:"row"}]}>
            <View style={[{flex: 1, padding:2}]}>
              <Text style={[{fontSize:8, paddingRight: 2}]}>Landline No: </Text>
              <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>23378383937</Text>
            </View>
            <View style={[{flex: 1, padding:2}]}>
              <Text style={[{fontSize:8, paddingRight: 2}]}>Phone Number: </Text>
              <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>0757501751</Text>
            </View>
            <View style={[{flex: 1, padding:2}]}>
              <Text style={[{fontSize:8, paddingRight: 2}]}>Email: </Text>
              <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>davidderrickanyuru@gmail.com</Text>
            </View>
            <View style={[{flex: 1, padding:2}]}>
              <Text style={[{fontSize:8, paddingRight: 2}]}>Date of Birth: </Text>
              <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>30/09/1997</Text>
            </View>
          </View>
        </View>
        <View style={[{height:40, marginTop:5, marginBottom:5}]}>
          <View style={[{flex: 1, flexDirection:"row"}]}>
            <View style={[{flex: 1, padding:2}]}>
              <Text style={[{fontSize:8, paddingRight: 2}]}>Gender: </Text>
              <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>Male</Text>
            </View>
            <View style={[{flex: 1, padding:2}]}>
              <Text style={[{fontSize:8, paddingRight: 2}]}>Position in Sacco: </Text>
              <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>Treasurer</Text>
            </View>
            <View style={[{flex: 1, padding:2}]}>
              <Text style={[{fontSize:8, paddingRight: 2}]}>Postal Address: </Text>
              <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>27764 K'LA</Text>
            </View>
            <View style={[{flex: 1, padding:2}]}>
              <Text style={[{fontSize:8, paddingRight: 2}]}>Marital status: </Text>
              <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>Single</Text>
            </View>
          </View>
        </View>

        <Text style={[{fontSize: 9}]}>Next of Keen</Text>
        <View style={[{height:40, marginTop:5, marginBottom:5}]}>
          <View style={[{flex: 1, flexDirection:"row"}]}>
            <View style={[{flex: 1, padding:2}]}>
              <Text style={[{fontSize:8, paddingRight: 2}]}>Name: </Text>
              <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>Nakitto Rebecca Millicent</Text>
            </View>
            <View style={[{flex: 1, padding:2}]}>
              <Text style={[{fontSize:8, paddingRight: 2}]}>Contact: </Text>
              <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>0772519722</Text>
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
              <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>{"        "}</Text>
            </View>
            <View style={[{flex: 1, padding:2}]}>
              <Text style={[{fontSize:8, paddingRight: 2}]}>Contact: </Text>
              <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>{"        "}</Text>
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
              <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>Kawempe</Text>
            </View>
            <View style={[{flex: 1, padding:2}]}>
              <Text style={[{fontSize:8, paddingRight: 2}]}>County: </Text>
              <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>Central Division</Text>
            </View>
            <View style={[{flex: 1, padding:2}]}>
              <Text style={[{fontSize:8, paddingRight: 2}]}>Sub County: </Text>
              <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>Bwaise 1</Text>
            </View>
            <View style={[{flex: 1, padding:2}]}>
              <Text style={[{fontSize:8, paddingRight: 2}]}>Parish: </Text>
              <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>Kazo</Text>
            </View>
          </View>
        </View>
        <View style={[{height:40, marginTop:5, marginBottom:5}]}>
          <View style={[{flex: 1, flexDirection:"row"}]}>
            <View style={[{flex: 1, padding:2}]}>
              <Text style={[{fontSize:8, paddingRight: 2}]}>Sub Parish: </Text>
              <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>Kawempe</Text>
            </View>
            <View style={[{flex: 1, padding:2}]}>
              <Text style={[{fontSize:8, paddingRight: 2}]}>Years spent: </Text>
              <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>5 years</Text>
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
              <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>Ablestate</Text>
            </View>
            <View style={[{flex: 1, padding:2}]}>
              <Text style={[{fontSize:8, paddingRight: 2}]}>Postal Address: </Text>
              <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>{"       "}</Text>
            </View>
            <View style={[{flex: 1, padding:2}]}>
              <Text style={[{fontSize:8, paddingRight: 2}]}>Telephone Number: </Text>
              <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>5 years</Text>
            </View>
            <View style={[{flex: 1, padding:2}]}>
              <Text style={[{fontSize:8, paddingRight: 2}]}>Designation: </Text>
              <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>Manager</Text>
            </View>
          </View>
        </View>
        <View style={[{height:40, marginTop:5, marginBottom:5}]}>
          <View style={[{flex: 1, flexDirection:"row"}]}>
            <View style={[{flex: 1, padding:2}]}>
              <Text style={[{fontSize:8, paddingRight: 2}]}>Retirement Date: </Text>
              <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>Ablestate</Text>
            </View>
            <View style={[{flex: 1, padding:2}]}>
              <Text style={[{fontSize:8, paddingRight: 2}]}>Employment Terms: </Text>
              <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>Casual</Text>
            </View>
            <View style={[{flex: 2, padding:2}]}>
              <Text style={[{fontSize:8, paddingRight: 2}]}>Assets owned: </Text>
              <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>Land, Motor Vechicle, Twinkle Toes Limited.</Text>
            </View>
          </View>
        </View>
        <View style={[{height:40, marginTop:5, marginBottom:5}]}>
          <View style={[{flex: 1, flexDirection:"row"}]}>
            <View style={[{flex: 1, padding:2}]}>
              <Text style={[{fontSize:8, paddingRight: 2}]}>Type of Business: </Text>
              <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>Parnership</Text>
            </View>
            <View style={[{flex: 1, padding:2}]}>
              <Text style={[{fontSize:8, paddingRight: 2}]}>Years of operation: </Text>
              <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>5 years</Text>
            </View>
            <View style={[{flex: 1, padding:2}]}>
              <Text style={[{fontSize:8, paddingRight: 2}]}>Business Income: </Text>
              <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>UGX 5,000,000</Text>
            </View>
            <View style={[{flex: 1, padding:2}]}>
              {/* <Text style={[{fontSize:8, paddingRight: 2}]}>Designation: </Text>
              <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>Manager</Text> */}
            </View>
          </View>
        </View>

      </Page>
      <Page style={styles.body}>
        <Text style={[{fontSize: 10}]}>C. LOAN PARTICULARS</Text>
        <View style={[{height:40, marginTop:5, marginBottom:5}]}>
          <View style={[{flex: 1, flexDirection:"row"}]}>
            <View style={[{flex: 1, padding:2}]}>
              <Text style={[{fontSize:8, paddingRight: 2}]}>Loan Type: </Text>
              <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>Extended</Text>
            </View>
            <View style={[{flex: 1, padding:2}]}>
              <Text style={[{fontSize:8, paddingRight: 2}]}>Extended Loan Id: </Text>
              <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>TUBELN0390393034</Text>
            </View>
            <View style={[{flex: 1, padding:2}]}>
              <Text style={[{fontSize:8, paddingRight: 2}]}>Purpose of Loan: </Text>
              <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>To come out of the recession</Text>
            </View>
            <View style={[{flex: 1, padding:2}]}>
              <Text style={[{fontSize:8, paddingRight: 2}]}>Amount applied for in figures: </Text>
              <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>1,000,000</Text>
            </View>
            
            
          </View>
        </View>
        <View style={[{height:40, marginTop:5, marginBottom:5}]}>
          <View style={[{flex: 1, flexDirection:"row"}]}>
            <View style={[{flex: 1, padding:2}]}>
              <Text style={[{fontSize:8, paddingRight: 2}]}>Amount applied for in words: </Text>
              <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>One million Uganda shillings only</Text>
            </View>
            <View style={[{flex: 1, padding:2}]}>
              <Text style={[{fontSize:8, paddingRight: 2}]}>Repayment period: </Text>
              <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>5 months</Text>
            </View>
            <View style={[{flex: 1, padding:2}]}>
              <Text style={[{fontSize:8, paddingRight: 2}]}>Repayment method: </Text>
              <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>Cash</Text>
            </View>
            <View style={[{flex: 1, padding:2}]}>
              {/* <Text style={[{fontSize:8, paddingRight: 2}]}>Amount applied for in figures: </Text>
              <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>1,000,000</Text> */}
            </View>
          </View>
        </View>
        <Text style={[{fontSize: 9}]}>LOANS IN OTHER BANKS</Text>
        <View style={[{height:40, marginTop:5, marginBottom:5}]}>
          <View style={[{flex: 1, flexDirection:"row"}]}>
            <View style={[{flex: 1, padding:2}]}>
              <Text style={[{fontSize:8, paddingRight: 2}]}>Name: </Text>
              <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>Centenary bank</Text>
            </View>
            <View style={[{flex: 1, padding:2}]}>
              <Text style={[{fontSize:8, paddingRight: 2}]}>Amount advannced: </Text>
              <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>UGX 1,000,000</Text>
            </View>
            <View style={[{flex: 1, padding:2}]}>
              <Text style={[{fontSize:8, paddingRight: 2}]}>Date granted: </Text>
              <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>12/3/2022</Text>
            </View>
            <View style={[{flex: 1, padding:2}]}>
              <Text style={[{fontSize:8, paddingRight: 2}]}>Repayment period: </Text>
              <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>Electronic Fund Transfer</Text>
            </View>
            <View style={[{flex: 1, padding:2}]}>
              <Text style={[{fontSize:8, paddingRight: 2}]}>Balance: </Text>
              <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>UGX 80,000</Text>
            </View>
          </View>
        </View>
        <View style={[{height:40, marginTop:5, marginBottom:10}]}>
          <View style={[{flex: 1, flexDirection:"row"}]}>
            <View style={[{flex: 1, padding:2}]}>
              <Text style={[{fontSize:8, paddingRight: 2}]}>Name: </Text>
              <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>{"     "}</Text>
            </View>
            <View style={[{flex: 1, padding:2}]}>
              <Text style={[{fontSize:8, paddingRight: 2}]}>Amount advannced: </Text>
              <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>{"     "}</Text>
            </View>
            <View style={[{flex: 1, padding:2}]}>
              <Text style={[{fontSize:8, paddingRight: 2}]}>Date granted: </Text>
              <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>{"     "}</Text>
            </View>
            <View style={[{flex: 1, padding:2}]}>
              <Text style={[{fontSize:8, paddingRight: 2}]}>Repayment period: </Text>
              <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>{"     "}</Text>
            </View>
            <View style={[{flex: 1, padding:2}]}>
              <Text style={[{fontSize:8, paddingRight: 2}]}>Balance: </Text>
              <Text style={[{fontSize:8, border: "solid", borderBottom:1, borderBottomColor:"black"}]}>{"     "}</Text>
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
                  <View style={[{height: 12}]}>
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

        <Text style={[{fontSize:8, marginVertical: 2}]}>Note: (Financial statements of the above individuals based on their account numbers must be attached to this form)</Text>






        

        






      </Page>
      <Page>
        <Text style={[{fontSize:9, marginVertical: 3, borderBottom: "solid", borderBottomWidth: 1, borderBottomColor: "black", width: 160,}]}>DECLARATION OF THE BORROWER</Text>
      </Page>
        
      
    </Document>
  )
}

export default LoanPDF
/* <View style={{...styles.flex, ...styles.flexCol}}>
          <Text style={styles}>Personal information</Text>
          <View>
            <View>
              <Text>Applicants Name </Text>
              <Text>{applicant_name}</Text>
            </View>
            <View>
              <Text>Postal Address </Text>
              <Text>{postal_address}</Text>
            </View>
            <View>
              <Text>Landline Number </Text>
              <Text>{landline_number}</Text>
            </View>
            <View>
              <Text>Marital Status</Text>
              <Text>{marital_status}</Text>
            </View>
            <View>
              <Text>Spouse</Text>
              <View>
                <Text>Name</Text>
                <Text>{spouse_name}</Text>
              </View>
              <View>
                <Text>Contact</Text>
                <Text>{spouse_contact}</Text>
              </View>
              <View>
                <Text>Next of Kin</Text>
                <View>
                  <Text>Name</Text>
                  <Text>{kin_name}</Text>
                </View>
                <View>
                  <Text>Contact</Text>
                  <Text>{kin_contact}</Text>
                </View>
              </View>
            </View>
          </View>
          <View>
            <Text>Physical Address</Text>
          </View>
        </View>
        <Text
          style={styles.pageNumber}
          render={({pageNumber, totalPages}) => `${pageNumber} / ${totalPages}`}
        ></Text> */