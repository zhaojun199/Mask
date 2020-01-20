import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
// import Popover from '../Popover'
import { inputClass, selectClass } from '../styles'
import { isObject } from '../utils/is'
import Input from './Input'

export const IS_NOT_MATCHED_VALUE = 'IS_NOT_MATCHED_VALUE'

const getResultContent = (data, renderResult, renderUnmatched) => {
    if (isObject(data) && data.IS_NOT_MATCHED_VALUE) {
        if (typeof renderUnmatched === 'function') return renderUnmatched(data.value)
        return isObject(data.value) ? renderResult(data.value) : data.value
    }
    return renderResult(data)
}

// eslint-disable-next-line
function Item({ renderResult, renderUnmatched, data, disabled, onClick }) {
    const value = data
    const click = disabled || !onClick ? undefined : () => onClick(value)
    const synDisabled = disabled || !click
    return (
        <a tabIndex={-1} className={selectClass('item', disabled && 'disabled', synDisabled && 'ban')}>
            {getResultContent(data, renderResult, renderUnmatched)}
            {!synDisabled && <span className={selectClass('indicator', 'close')} onClick={click} />}
        </a>
    )
}

class Result extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            more: false,
        }

        this.handleRemove = this.handleRemove.bind(this)
        this.handelMore = this.handelMore.bind(this)
    }

    componentDidUpdate() {
        const { result, compressed } = this.props
        if (compressed && result.length <= 1) this.state.more = false
    }

    handleRemove(...args) {
        const { onRemove } = this.props
        setTimeout(() => {
            onRemove(...args)
        }, 10)
    }

    handelMore(more) {
        this.setState({ more })
    }

    renderMore(list) {
        const { datum, renderResult, renderUnmatched } = this.props
        const { more } = this.state
        return (
            <a tabIndex={-1} key="more" className={selectClass('item', 'item-compressed', more && 'item-more')}>
                <span>{`+${list.length - 1}`}</span>
                {/* <Popover visible={more} onVisibleChange={this.handelMore} className={selectClass('popover')}> */}
                <div className={selectClass('result')}>
                    {list.map((d, i) => (
                        <Item
                            key={i}
                            data={d}
                            disabled={datum.disabled(d)}
                            onClick={this.handleRemove}
                            renderResult={renderResult}
                            renderUnmatched={renderUnmatched}
                        />
                    ))}
                </div>
                {/* </Popover> */}
            </a>
        )
    }

    renderClear() {
        const { onClear, result, disabled } = this.props

        if (onClear && result.length > 0 && disabled !== true) {
            /* eslint-disable */
      return (
        <div onClick={onClear} className={selectClass('close-warpper')}>
          <a
          tabIndex={-1}
          data-role="close"
          className={selectClass('indicator', 'close')}
        />
        </div>
      )
      /* eslint-enable */
        }

        return null
    }

    renderInput(text, key = 'input') {
        const { multiple, onFilter, trim, focus, onInputFocus, onInputBlur, setInputReset } = this.props
        return (
            <Input
                key={`${key}.${focus ? 1 : 0}`}
                onInputFocus={onInputFocus}
                onInputBlur={onInputBlur}
                updatAble={!multiple}
                multiple={multiple}
                focus={focus}
                text={text}
                trim={trim}
                onFilter={onFilter}
                setInputReset={setInputReset}
            />
        )
    }

    renderPlaceholder() {
        const { focus, onFilter } = this.props

        if (focus && onFilter) {
            return this.renderInput(' ')
        }

        return (
            <span className={classnames(inputClass('placeholder'), selectClass('ellipsis'))}>
                {this.props.placeholder}
        &nbsp;
            </span>
        )
    }

    renderResult() {
        const {
            multiple,
            compressed,
            result,
            renderResult,
            renderUnmatched,
            onFilter,
            focus,
            datum,
            filterText,
        } = this.props

        if (multiple) {
            const neededResult = compressed ? result.slice(0, 1) : result
            const firstRemove = !compressed || result.length === 1
            const items = neededResult.map((d, i) => (
                <Item
                    key={i}
                    data={d}
                    disabled={datum.disabled(d)}
                    onClick={firstRemove ? this.handleRemove : undefined}
                    renderResult={renderResult}
                    renderUnmatched={renderUnmatched}
                />
            ))

            if (compressed && result.length > 1) {
                items.push(this.renderMore(result))
            }

            if (focus && onFilter) {
                items.push(this.renderInput(filterText, result.length))
            }

            return items
        }

        if (onFilter) {
            return this.renderInput(getResultContent(result[0], renderResult, renderUnmatched))
        }

        const v = getResultContent(result[0], renderResult, renderUnmatched)

        return (
            <span title={v} className={selectClass('ellipsis')}>
                {v}
            </span>
        )
    }

    render() {
        const { compressed } = this.props
        const result = this.props.result.length === 0 ? this.renderPlaceholder() : this.renderResult()

        return (
            <div className={selectClass('result', compressed && 'compressed')}>
                {result}
                {!this.props.multiple && (
                // eslint-disable-next-line
          <a tabIndex={-1} className={selectClass('indicator', 'caret')} />
                )}
                {this.renderClear()}
            </div>
        )
    }
}

Result.propTypes = {
    datum: PropTypes.object,
    disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    filterText: PropTypes.string,
    focus: PropTypes.bool,
    multiple: PropTypes.bool.isRequired,
    onRemove: PropTypes.func,
    onClear: PropTypes.func,
    onFilter: PropTypes.func,
    onInputBlur: PropTypes.func,
    onInputFocus: PropTypes.func,
    result: PropTypes.array.isRequired,
    renderResult: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    setInputReset: PropTypes.func,
    compressed: PropTypes.bool,
    trim: PropTypes.bool,
    renderUnmatched: PropTypes.func,
}

export default Result
