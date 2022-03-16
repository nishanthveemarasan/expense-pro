<div id="sidebar" class="active">
    <div class="sidebar-wrapper active">
        <div class="sidebar-menu">
            <ul class="menu">
                <li class="sidebar-item  ">
                    <a href="{{ url('/') }}" class='sidebar-link'>
                        <i class="bi bi-pie-chart-fill"></i>
                        <span>Expense</span>
                    </a>
                </li>

                <li class="sidebar-item  ">
                    <a href="{{ url('/debt') }}" class='sidebar-link'>
                        <i class="bi bi-stack"></i>
                        <span>Debt</span>
                    </a>
                </li>
                <li class="sidebar-item  ">
                    <a href="{{ url('/todo') }}" class='sidebar-link'>
                        <i class="bi bi-chat-right-dots-fill"></i>
                        <span>Todo</span>
                    </a>
                </li>
                <li class="sidebar-item  ">
                    <a href="{{ url('/saving') }}" class='sidebar-link'>
                        <i class="bi bi-wallet-fill"></i>
                        <span>Saving</span>
                    </a>
                </li>
            </ul>
        </div>
        <button class="sidebar-toggler btn x"><i data-feather="x"></i></button>
    </div>
</div>