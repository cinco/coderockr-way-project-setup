import React from 'react'
import Loading from '../Components/Loading';
import ProjectListSelector from '../Components/ProjectListSelector';
import { withGithubRepositories } from './withGitHubRepositories';
import LABELS_TO_ADD from '../Labels';
import invertColor from '../invertColor';
import './GitHub.css';

class GitHub extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedOption: null,
      applying: false,
    }
  }

  handleApply(selectedOption) {
    console.log(selectedOption)
    this.setState({ selectedOption, applying: true })
  }

  render() {
    const { loading, repositories } = this.props;

    return (
      <div className="GitHub">
        {loading ?
          <section>
            <h2>Loading...</h2>
            <Loading />
          </section>
          :
          <section>
            <ProjectListSelector className="select-group"
              disabled={this.state.applying}
              selected={this.state.selectedOption}
              projects={repositories.map(r => Object.assign(r, {
                value: r.full_name,
                label: r.full_name,
              }))}
              onApply={(selected) => this.handleApply(selected)}
            />
            {!this.state.applying ? null :
              <div className="row applying-status">
                <div className="col-md-12"><Loading /></div>
              </div>
            }
            <div className="row labels">
              {LABELS_TO_ADD.map(({ name, color }) => (
                <div key={name} className="col-md-4">
                  <label alt={name} className="label-item"
                    style={{ backgroundColor: '#' + color, color: invertColor('#' + color, true) }}
                  >
                    <input disabled type="checkbox" />
                    {name}
                  </label>
                </div>
              ))}
            </div>
          </section>
        }
      </div>
    )
  }
}

export default withGithubRepositories(GitHub)