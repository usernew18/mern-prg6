import React from "react";

class EdRow extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.id}</td>
        <td>{this.props.name}</td>
        <td>{this.props.place}</td>
        <td>{this.props.stddeg}</td>
        <td>{this.props.grade}</td>
      </tr>
    );
  }
}

class EdTable extends React.Component {
  render() {
    const education = [
      {
        id: 1,
        name: "International Public School",
        place: "Bengaluru",
        stddeg: "12th",
        grade: "O+",
      },
      {
        id: 2,
        name: "Indian Institute of Science",
        place: "Bengaluru",
        stddeg: "Undergraduate",
        grade: "8.8",
      },
    ];

    const edudetails = education.map((educ) => (
      <EdRow
        key={educ.id}
        id={educ.id}
        name={educ.name}
        place={educ.place}
        stddeg={educ.stddeg}
        grade={educ.grade}
      />
    ));

    return (
      <table className="edu-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Institution Name</th>
            <th>Place</th>
            <th>Education</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>{edudetails}</tbody>
      </table>
    );
  }
}

class Education extends React.Component {
  render() {
    return (
      <section className="education-section">
        <h2>Educational Details</h2>
        <EdTable />
      </section>
    );
  }
}

export default Education;
