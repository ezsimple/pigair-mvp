import XLSX from 'xlsx';
import { DateUtil } from 'utils';
import i18n from 'i18next';

class ExcelUtil {
  // table Id를 가지고 엑셀파일을 생성 합니다.
  static exportTable = async (
    tableId,
    fileName = 'ExcelReport_' + DateUtil.toPostfixDateTimeString(),
    sheetName = 'Sheet'
  ) => {
    // -------------+-------------------------------------------------------------
    // Option Name	| Default	| Description
    // -------------+---------+---------------------------------------------------
    // raw          |		      | If true, every cell will hold raw strings
    // dateNF       |	FMT 14  |	Use specified date format in string output
    // cellDates    |	false	  | Store dates as type d (default is n)
    // sheetRows	  | 0	      |If >0, read the first sheetRows rows of the table
    // display	    | false	  | If true, hidden rows and cells will not be parsed
    // -------------+---------+---------------------------------------------------
    var option = { raw: true, type: 'string' };
    var new_workbook = XLSX.utils.book_new();
    var worksheet = XLSX.utils.table_to_sheet(
      document.getElementById(tableId),
      option
    );
    XLSX.utils.book_append_sheet(new_workbook, worksheet, sheetName);

    // write a workbook
    XLSX.writeFile(new_workbook, fileName + '.xlsx');
  };

  // jsonArray를 가지고 엑셀파일을 생성 합니다.
  static exportJSON = async (
    jsonData,
    fileName = 'ExcelReport_' + DateUtil.toPostfixDateTimeString(),
    sheetName = 'Sheet'
  ) => {
    const timeOut = 1;
    if (!jsonData || jsonData.length == 0) {
      // message.error(`${i18n.t('m.해당 데이터가 없습니다')}`, timeOut);
      return;
    }
    if (!Array.isArray(jsonData)) {
      // message.error(`${i18n.t('m.해당 데이터가 없습니다')}`, timeOut);
      return;
    }

    var new_workbook = XLSX.utils.book_new();
    var worksheet = XLSX.utils.json_to_sheet(jsonData);
    XLSX.utils.book_append_sheet(new_workbook, worksheet, sheetName);

    // write a workbook
    XLSX.writeFile(new_workbook, fileName + '.xlsx');
  };

  static importExcelFile = (file, sucessCallback, errorCallack) => {
    console.log('file!', file.target);
    // Get the uploaded file object
    const { files } = file.target;
    console.log('file!', files);
    // Read the file through the FileReader object
    const fileReader = new FileReader();
    let data = [];
    fileReader.onload = event => {
      try {
        const { result } = event.target;
        // Read the entire excel table object in binary stream
        const workbook = XLSX.read(result, { type: 'binary' });
        // Store the acquired data
        // Traverse each worksheet for reading (here only the first table is read by default)
        for (const sheet in workbook.Sheets) {
          // esline-disable-next-line
          if (workbook.Sheets.hasOwnProperty(sheet)) {
            // Convert excel to json data using the sheet_to_json method
            data = data.concat(
              XLSX.utils.sheet_to_json(workbook.Sheets[sheet])
            );
            // break; // If you only take the first table, uncomment this line
          }
        }
        // finally get and formatted json data
        console.log('Upload succeeded!');
        // console.log(data);
        sucessCallback(data);
        return data;
      } catch (e) {
        // Here you can throw a related prompt with a file type error incorrect.
        // Message.error('The file type is incorrect!');
        console.error('The file type is incorrect!');
        errorCallback(i18n.t('The file type is incorrect!'));
      }
    };
    // Open the file in binary mode
    fileReader.readAsBinaryString(files[0]);
    return data;
  };
}

export default ExcelUtil;
