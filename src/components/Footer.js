import { connect } from "react-redux";
import React from "react";

import { APPLY_ACTIVE_FILTER, APPLY_ALL_FILTER, APPLY_COMPLETED_FILTER, SET_PAGE } from "../actionTypes";
import agent from "../agent";
import FilterLink from "./FilterLink";

function mapStateToProps(state) {
    return {
        todosCount: state.todos.todosCount,
        currentPage: state.todos.currentPage,
        pager: state.todos.pager,
        inProgress: state.todos.inProgress,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onClickAllFilter() {
            dispatch({
                type: APPLY_ALL_FILTER,
                pager: agent.Todos.all,
                payload: agent.Todos.all(),
            });
        },
        onClickActiveFilter() {
            dispatch({
                type: APPLY_ACTIVE_FILTER,
                pager: agent.Todos.byActive,
                payload: agent.Todos.byActive(),
            });
        },
        onClickCompletedFilter() {
            dispatch({
                type: APPLY_COMPLETED_FILTER,
                pager: agent.Todos.byCompleted,
                payload: agent.Todos.byCompleted(),
            });
        },
        onSetPage(page, payload) {
            dispatch({ type: SET_PAGE, page, payload });
        },
    };
}

function Footer({
    todosCount,
    currentPage,
    pager,
    inProgress,
    onClickAllFilter,
    onClickActiveFilter,
    onClickCompletedFilter,
    onSetPage,
}) {
    var setPreviousPage = () => {
        if (currentPage === 1) {
            return;
        }
        var page = currentPage - 1;
        onSetPage(page, pager(page));
    };

    var pagesCount = Math.ceil(todosCount / agent.LIMIT) ? Math.ceil(todosCount / agent.LIMIT) : 1;

    var setNextPage = () => {
        if (currentPage === pagesCount) {
            return;
        }
        var page = currentPage + 1;
        onSetPage(page, pager(page));
    };

    return (
        <footer className="footer">
            <span className="todo-count">
                <strong>
                    {currentPage} of {pagesCount}
                </strong>{" "}
                {"pages"}
            </span>
            <ul className="filters">
                <li>
                    <FilterLink onClick={setPreviousPage} inProgress={inProgress}>
                        {"<"}
                    </FilterLink>
                </li>
                <li>
                    <FilterLink onClick={setNextPage} inProgress={inProgress}>
                        {">"}
                    </FilterLink>
                </li>
                <li>
                    <FilterLink onClick={onClickAllFilter} inProgress={inProgress}>
                        All
                    </FilterLink>
                </li>
                <li>
                    <FilterLink onClick={onClickActiveFilter} inProgress={inProgress}>
                        Active
                    </FilterLink>
                </li>
                <li>
                    <FilterLink onClick={onClickCompletedFilter} inProgress={inProgress}>
                        Completed
                    </FilterLink>
                </li>
            </ul>
        </footer>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
