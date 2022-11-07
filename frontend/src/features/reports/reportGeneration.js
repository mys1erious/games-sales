const createReportName = (doc, name) => {
    const nameElement = doc.createElement('div');
    nameElement.setAttribute(
        'style',
        'font-size: 24px;' +
        'margin-bottom: 20px;'
    )

    nameElement.textContent = name;
    return nameElement;
};

const createReportRemarks = (doc, remarks) => {
    const remarksElement = doc.createElement('div');
    remarksElement.setAttribute(
        'style',
        'font-size: 16px;'
    );

    remarksElement.textContent = `Remarks:\r\n${remarks}`;
    return remarksElement;
};

const createHeadersContainer = (doc, reportHeaders) => {
    const container = doc.createElement('div');
    container.setAttribute(
        'style',
        'text-align: center;'
    );

    const name = createReportName(doc, reportHeaders.name);
    container.appendChild(name);

    const remarks = createReportRemarks(doc, reportHeaders.remarks);
    container.appendChild(remarks);

    return container;
};

const createReportDate = (doc) => {
    const creationDate = doc.createElement('div');
    const date = new Date()
        .toString()
        .split(' ')
        .slice(0, 5)
        .join(' ');
    creationDate.textContent = `Creation date: ${date}`;
    return creationDate;
};

const createReportSearchParams = (doc) => {
    const searchParams = new URLSearchParams(window.location.search);
    if (!searchParams.toString()) return;

    const element = doc.createElement('div');
    element.setAttribute(
        'style',
        'white-space: pre;' +
        'margin-bottom: 10px;'
    )

    let str = 'Search params:\r\n';
    for (const param of searchParams)
        str += `- ${param[0]}=${param[1]}\r\n`

    element.textContent = str;
    return element;
};

const createReportSubHeadersContainer = (doc) => {
    const container = doc.createElement('div');
    container.setAttribute(
        'style',
        'margin-top: 30px;' +
        'font-size: 12px;' +
        'color: gray;' +
        'margin: 20px;'
    );

    const reportSearchParams = createReportSearchParams(doc);
    if (reportSearchParams)
        container.appendChild(createReportSearchParams(doc));
    container.appendChild(createReportDate(doc));
    return container;
};

const getReportBody = () => {
    const reportBody = document.createElement('div');
    reportBody.innerHTML = document.getElementById('reportBody').innerHTML;
    return reportBody;
};

const reportCleanup =(doc) => {
    doc.getElementById('describeTableExpandBtn').remove();
};

const setHtmlReportData = (doc, reportHeaders) => {
    const reportContainer = doc.createElement('div');
    reportContainer.setAttribute(
        'style',
        'margin: 4%;' +
        'word-wrap: break-word;'
    );

    reportContainer.appendChild(createHeadersContainer(doc, reportHeaders));
    reportContainer.appendChild(createReportSubHeadersContainer(doc));
    reportContainer.appendChild(getReportBody());

    doc.body.appendChild(reportContainer);
    reportCleanup(doc);
};

const copyMuiStyles = (doc) => {
    const styles = document.getElementsByTagName('style');
    for (const initStyle of styles) {
        const style = initStyle.cloneNode(true);
        doc.head.appendChild(style);
    }
};


export const createReportFile = (reportHeaders) => {
    const doc = document.implementation.createHTMLDocument('Report');
    copyMuiStyles(doc);
    setHtmlReportData(doc, reportHeaders);
    return doc;
};

export const HTMLDocumentToBlob = (doc) => (
    new Blob(
        [doc.documentElement.innerHTML],
        {type: "text/plain"})
);
